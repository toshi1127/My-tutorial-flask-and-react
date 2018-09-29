import React from "react";
import ImageSend from './container/imageSend';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
              <ImageSend/>
            </div>
        );
    }
}