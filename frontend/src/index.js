import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {
    BrowserRouter,
    Route, Switch
} from 'react-router-dom'
import App from './app';

const ImageApp = () => (
    <BrowserRouter>
        <div>
            <Route path='/' component={App} />
        </div>
    </BrowserRouter>
)


ReactDOM.render(
<ImageApp/>,document.getElementById('root')
);