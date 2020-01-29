import React from "react";
import "./LeaderBoardPage.css";
import styles from "./LeaderBoardPage";

//Core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Tabs from "./LeaderBoardTab.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";

//@material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

//References:
//https://www.creative-tim.com/product/material-dashboard
//https://stackoverflow.com/questions/48232067/justify-content-and-align-content-not-working-in-css-grid
//https://stackoverflow.com/questions/33673067/create-same-size-buttons
//https://stackoverflow.com/questions/48849071/how-to-center-cardheader-title-in-material-ui

class LeaderBoardPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <GridItem>
        <Card>
          <CardHeader style={{ textAlign: "center" }}>
            <CardText color="info">
              <h3>Today's Top 5 Users</h3>
            </CardText>
          </CardHeader>
          <CardBody>
            <Tabs />
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

export default withStyles(styles)(LeaderBoardPage);
