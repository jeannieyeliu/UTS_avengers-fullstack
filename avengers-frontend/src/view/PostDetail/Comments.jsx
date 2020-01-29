import React, { Component } from "react";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { CardMedia } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 100,
    paddingTop: "40.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

class GetComments extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card>
          <CardMedia className={classes.media} image={this.props.commentUrl} />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(GetComments);
