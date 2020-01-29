import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 30,
    paddingTop: "50%" // 16:9
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

class Topic extends React.Component {
  state = {
    imageUrl: "http://picsum.photos/300"
  };
  render() {
    const { classes } = this.props;
    return (
      <GridItem xs={3} sm={3} md={3} lg={3}>
        <Card product>
          <CardActionArea>
            <CardMedia className={classes.media} image={this.state.imageUrl} />
            <CardContent>Food</CardContent>
          </CardActionArea>
        </Card>
      </GridItem>
    );
  }
}
Topic.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Topic);
