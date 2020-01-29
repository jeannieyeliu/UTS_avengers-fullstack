import React, { Component } from "react";
import GridItem from "components/Grid/GridItem.jsx";
import Post from "view/Post";
import LeaderBoard from "view/LeaderBoard/LeaderBoardPage.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Topic from "view/Topic/Topic";
import http from "services/httpService";
import configApi from "config";

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdmMTM0MjllMDY1MDdhM2JlYTMxOGMiLCJ1c2VybmFtZSI6ImplYW5uaWUiLCJlbWFpbCI6ImplYW5uaWVAZ21haWwuY29tIiwiaWF0IjoxNTY4NjA5NTM1LCJleHAiOjE1NzcyNDk1MzV9.OtnlnI-HP2b-92SfLvs2hfP3jqiPreBAJprX19q8JeQ";
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: userToken
  }
};

class LandingPage extends Component {
  state = {
    post: []
  };

  componentWillMount() {
    http
      .get(`${configApi.baseURL}/post`, config)
      // .get(`https://localhost:3000/post`, {
      //   headers: {
      //     'Content-Type': "application/json",
      //     'Authorization':
      //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZiNGZkMjliZTgyNDAyZWZkMzQ1ZmQiLCJ1c2VybmFtZSI6IjEyMzQ1NiIsImVtYWlsIjoiMTIzQDEyMzQ1Ni5jb20iLCJpYXQiOjE1NjczMTM5MDksImV4cCI6MTU3NTk1MzkwOX0.qivp0lRv1xdXn0jd5_IoaP-RAMQlb2FFG8WKukx6J_4"
      //   }
      // })
      .then(res => {
        const post = res.data;
        this.setState({ post });
        console.log(this.state);
      });
  }
  render() {
    return (
      <div>
        <GridContainer>
          <Topic />
          <Topic />
          <Topic />
          <Topic />
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={6} md={8} lg={8}>
            <GridContainer>
              {this.state.post.map(po => (
                <Post key={po._id} id={po._id} poUrl={po.images_url[0]} />
              ))}
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={6} md={4} lg={4}>
            <GridContainer>
              <LeaderBoard />
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default LandingPage;
