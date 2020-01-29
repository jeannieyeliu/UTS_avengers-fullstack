import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import ImageIcon from "@material-ui/icons/Image";
import MyDropzone from "../CreatePost/ImageDragNDrop";

class CommentImg extends Component {
  state = { file: null, imagePreviewUrl: null };

  handleUploadFile = file => {
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: file[0],
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file[0]);
  };

  render() {
    return (
      <Fab color="secondary" size="small">
        <ImageIcon>
          <MyDropzone
            onDrop={acceptedFiles => this.handleUploadFile(acceptedFiles)}
            file={this.state.file}
            imagePreviewUrl={this.state.imagePreviewUrl}
          />
        </ImageIcon>
      </Fab>
    );
  }
}

export default CommentImg;
