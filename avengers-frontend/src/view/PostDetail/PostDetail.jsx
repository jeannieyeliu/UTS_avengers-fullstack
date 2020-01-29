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
import "./PostDetail.css";
import * as qiniu from "qiniu-js";
import http from "services/httpService";
import configApi from "config";
import CreatePostLinks from "../CreatePost/CreatePostLinks";
import CreatePostRules from "../CreatePost/CreatePostRules";
import CommentInput from "./CommentInput";
import { Link } from "react-router-dom";
import Comments from "./Comments";

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdmMTM0MjllMDY1MDdhM2JlYTMxOGMiLCJ1c2VybmFtZSI6ImplYW5uaWUiLCJlbWFpbCI6ImplYW5uaWVAZ21haWwuY29tIiwiaWF0IjoxNTY4NjA5NTM1LCJleHAiOjE1NzcyNDk1MzV9.OtnlnI-HP2b-92SfLvs2hfP3jqiPreBAJprX19q8JeQ";
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: userToken
  }
};

class PostDetail extends Component {
  state = {
    id: this.props.match.params.id,
    show: false,
    post: {},
    comments: [
      { images_url: "", _id: "", postId: "", commentator: "", created_at: "" }
    ],
    isCommentNull: true
  };

  componentWillMount() {
    http.get(`${configApi.baseURL}/post/${this.state.id}`, config).then(res => {
      const post = res.data;
      this.setState({ post });
      console.log(this.state);
    });

    http
      .get(`${configApi.baseURL}/post/${this.state.id}/comment`, config)
      .then(res => {
        console.log(res);
        const comments = res.data;
        console.log(comments[0].images_url[0]);
        this.setState({ comments });
        console.log(this.state.comments);
      });
  }

  handleShowCommentInput = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    console.log("post is", this.state.post);
    const { classes } = this.props;
    const { images_url, title, created_at, updatedAt } = this.state.post;
    return (
      <div className="main-body">
        <GridContainer justify="center">
          <GridItem xs={12} sm={7}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <AddPhotoAlternate />
                </CardIcon>
                <h2 className={classes.cardIconTitle}>
                  {this.state.post.title}
                </h2>
              </CardHeader>

              <CardBody>
                <form onSubmit={this.submit}>
                  <GridContainer>
                    <GridItem xs={8}>
                      <InputLabel className={classes.label}>
                        Create at:{this.state.post.created_at}
                        {/* {this.state.post.top.map(topic => (
                          <span>{topic}$nbsp;</span>
                        ))} */}
                      </InputLabel>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem lg={4}>
                      <div>
                        <img
                          src={
                            this.state.post.images_url === undefined
                              ? ""
                              : this.state.post.images_url[0]
                          }
                          alt="..."
                          className="dropzone"
                        />
                      </div>
                    </GridItem>
                  </GridContainer>
                  <Button
                    type="button"
                    color="rose"
                    onClick={this.handleShowCommentInput}
                    className={classes.registerButton}
                  >
                    Comment
                  </Button>
                  <Button
                    color="rose"
                    onClick={this.props.history.goBack}
                    className={classes.registerButton + " btn-cancel"}
                  >
                    Back
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
        <GridContainer>
          <GridItem xs={12} sm={7}>
            <CommentInput show={this.state.show} />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={7}>
            {/* <p>{this.state.comments[0].images_url[0]}</p> */}
            {this.state.comments.map(com => (
              <Comments commentUrl={com.images_url[0]} />
            ))}
            {/* <Comments commentUrl="../../assets/emojis/happy.svg"></Comments> */}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

PostDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(extendedFormsStyle)(PostDetail);
