import React from "react";
import Edit from "@material-ui/icons/Edit";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import PropTypes from "prop-types";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

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

class Post extends React.Component {
  state = {
    imageUrl: "http://picsum.photos/1000"
  };
  render() {
    const { classes, id } = this.props;
    const toUrl = `postdetail/${id}`;
    return (
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <Card>
          <CardActionArea>
            <Link to={toUrl}>
              <CardMedia
                className={classes.media}
                image={this.props.poUrl}
              ></CardMedia>
            </Link>
          </CardActionArea>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="Edit">
              <Edit />
            </IconButton>
          </CardActions>
        </Card>
      </GridItem>
    );
  }
}
Post.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
