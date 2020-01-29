import React, { Component } from "react";
import Dropzone from "react-dropzone";

class MyDropzone extends Component {
  render() {
    return (
      //   <div className="dropzone">
      <Dropzone
        onDrop={acceptedFiles => {
          console.log(acceptedFiles);
          this.props.onDrop(acceptedFiles);
        }}
        disableClick={false}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {this.props.file === null ? (
                <div className="dropzone">
                  {[...Array(4)].map((_,i) => (
                    <br key={i}/>
                  ))}
                  <h1>Drag and drop image here</h1>
                </div>
              ) : (
                <img
                  src={this.props.imagePreviewUrl}
                  className="dropzone"
                  alt="..."
                />
              )}
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default MyDropzone;
