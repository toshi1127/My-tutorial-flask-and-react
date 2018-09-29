import React from "react";
import styled from "styled-components";
import $ from "jquery";
import axios from "axios";
import Loading from "../component/roadComponent";

export default class ImageSend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageDate: null,
      receiveDate: null,
      isLoad: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  onSubmit(e) {
    const { imageDate } = this.state;
    const formData = new FormData();
    formData.append("img_file", this.state.imageDate, "testImage.png");
    this.setState({
      isLoad: !this.state.isLoad
    });

    axios({
      method: "post",
      url: "/send",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    }).then((response) => {
      this.setState({
        receiveDate: response.data,
        isLoad: !this.state.isLoad
      });
    });
  }

  onInput(e) {
    const files = e.target.files;

    this.setState({
      imageDate: files[0]
    });
  }

  render() {
    const { receiveDate, isLoad } = this.state;
    if (!isLoad) {
      return (
        <div>
          <input
            type="file"
            name="upfile"
            id="upfile"
            accept="image/*"
            capture="camera"
            onInput={this.onInput}
          />
          <button onClick={this.onSubmit}>送信</button>
          {receiveDate && <img src={`data:image/png;base64,${receiveDate}`} />}
        </div>
      );
    }
    return <Loading />;
  }
}
