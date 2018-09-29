import os
import io
import time
import numpy as np
import cv2
import base64
from flask import Flask, render_template, request, redirect, url_for, Response
from io import BytesIO
from werkzeug import secure_filename
import math
import sys

app = Flask(__name__)

UPLOAD_FOLDER = './uploads'
IMAGE_FOLDER = './image'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'PNG', 'JPG'])
IMAGE_WIDTH = 640
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['IMAGE_FOLDER'] = IMAGE_FOLDER
app.config['SECRET_KEY'] = os.urandom(24)

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send', methods=['GET', 'POST'])
def send():
    if request.method == 'POST':
        img_file = request.files['img_file']

        # 変なファイル弾き
        if img_file and allowed_file(img_file.filename):
            filename = secure_filename(img_file.filename)
        else:
            return ''' <p>許可されていない拡張子です</p> '''

        # BytesIOで読み込んでOpenCVで扱える型にする
        f = img_file.stream.read()
        bin_data = io.BytesIO(f)
        file_bytes = np.asarray(bytearray(bin_data.read()), dtype=np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        # ここでOpenCVで好きな処理をする
        raw_img = cv2.resize(img, (IMAGE_WIDTH, int(IMAGE_WIDTH*img.shape[0]/img.shape[1])))
        gray_img = cv2.cvtColor(raw_img, cv2.COLOR_BGR2GRAY)

        retval, buffer = cv2.imencode('.png', gray_img)
        jpg_as_text = base64.b64encode(buffer)
        return Response(response=jpg_as_text, content_type='image/jpeg')

    else:
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.debug = True
    app.run()