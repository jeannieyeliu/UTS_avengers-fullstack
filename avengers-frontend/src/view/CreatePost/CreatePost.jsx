import React, { Component } from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "components/CustomButtons/Button.jsx";
import PropTypes from "prop-types";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import "./CreatePost.css";
import * as qiniu from "qiniu-js";
import http from "services/httpService";
import configApi from "config";
import CreatePostLinks from "./CreatePostLinks";
import CreatePostRules from "./CreatePostRules";
import TopicList from "./TopicList";
import MyDropzone from "./ImageDragNDrop";


const config = {
  useCdnDomain: true,
  region: qiniu.region.as0 // service area
};

let putExtra = {
  fname: "",
  params: {},
  mimeType: ["image/png", "image/jpeg", "image/gif"]
};

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: null,
      isRedireting: false,
      topic: "",
      topicId: 0,
      topics: [
        { id: 2, name: "Food" },
        { id: 3, name: "Sport" },
        { id: 4, name: "Movie" },
        { id: 5, name: "Music" },
        { id: 6, name: "Technology" },
        { id: 7, name: "Fun" },
        { id: 8, name: "Health" }
      ]
    };
  }

  observer = {
    next(res) {
      // ...
      console.log("call next", res)
    },
    error(err) {
      // ...
      console.log("got error",err);
    },
    complete(res) {
      const url = `${configApi.qiniuUrl}${res.key}`;
      console.log("qiniu image url: ", url)
      const userToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdmMTM0MjllMDY1MDdhM2JlYTMxOGMiLCJ1c2VybmFtZSI6ImplYW5uaWUiLCJlbWFpbCI6ImplYW5uaWVAZ21haWwuY29tIiwiaWF0IjoxNTY4NjA5NTM1LCJleHAiOjE1NzcyNDk1MzV9.OtnlnI-HP2b-92SfLvs2hfP3jqiPreBAJprX19q8JeQ";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken
        }
      };
      const body = {
        title: "testN",
        images_url: [url]
      };
      console.log("qiniu url", url)
      http.post(`${configApi.baseURL}/post`, body, config).then(res => {
        console.log("test post result", res.data);
        const {_id,title} = res.data;
        console.log("get post by id,title", _id,title);
        console.log("what is this",this);
        // this.props.history.push(`postdetail/${_id}/${title}`);
        window.location.replace(`postdetail/${_id}/${title}`)
      });
    }
  };
  
  submit = async e => {
    this.setState({
      isRedireting: true
    })

    e.preventDefault();
    console.log("getqiniu token",configApi.qiniuTokenApi)
    const result = await http.get(configApi.qiniuTokenApi);

    console.log("getqiniu finish")
    const qiniuToken = result.data["qiniu-token"];
    const observable = qiniu.upload(
      this.state.file,
      this.state.file.fileName,
      qiniuToken,
      putExtra,
      config
    );

    console.log("qiniu qiniuToken", observable)
    // this.observer.complete.bind(this);
    observable.subscribe(this.observer); // begin to upload
  };

  handleTopicChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ topic: event.target.value });
  };

  handCreatePost = () => {
    console.log("create a new post");
  };

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
    const { classes } = this.props;

    return (
      <div className="main-body">
        <GridContainer justify="center">
          <GridItem xs={12} sm={7}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <AddPhotoAlternate />
                </CardIcon>
                <h2 className={classes.cardIconTitle}>Create a new session</h2>
              </CardHeader>

              <CardBody>
                <form onSubmit={this.submit}>
                  <GridContainer>
                    <GridItem xs={8}>
                      <InputLabel className={classes.label}>
                        Upload a picture to start the session
                      </InputLabel>
                    </GridItem>
                    <GridItem xs={4}>
                      <TopicList topics={this.state.topics} topic={this.state.topic} onChange={(event) => this.handleTopicChange(event)}/>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem lg={4}>
                      <div>
                        <MyDropzone onDrop={acceptedFiles =>
                            this.handleUploadFile(acceptedFiles)
                          } file={this.state.file} imagePreviewUrl={this.state.imagePreviewUrl}/> 
                      </div>
                    </GridItem>
                  </GridContainer>
                  <Button
                    type="submit"
                    color="rose"
                    onClick={this.submit}
                    disabled = {this.state.file === null || this.state.isRedireting}
                    className={classes.registerButton}
                  >
                    Post
                  </Button>
                  <Button
                    color="rose"
                    onClick={this.props.history.goBack}
                    className={classes.registerButton+" btn-cancel"}
                  >
                    Cancel
                  </Button>
                </form>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={5}>
            <CreatePostRules {...this.props} />
            <CreatePostLinks {...this.props} />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

CreatePost.propTypes = {
  classes: PropTypes.object
};

export default withStyles(extendedFormsStyle)(CreatePost);
