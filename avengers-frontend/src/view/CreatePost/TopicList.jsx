import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import PropTypes from "prop-types";

class TopicList extends Component {
  state = {
    simpleSelect: "",
  }
  render() {
    const { classes, topics } = this.props;
    return (
      // <GridItem xs={12} sm={6} md={5} lg={5}>
        <FormControl fullWidth className={classes.selectFormControl}>
          <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
            Choose Topic
          </InputLabel>
          <Select
            MenuProps={{
              className: classes.selectMenu
            }}
            classes={{
              select: classes.select
            }}
            value={this.props.topic}
            onChange={this.props.handlehandleTopicChange}
            inputProps={{
              name: "simpleSelect",
              id: "simple-select"
            }}
          >
            <MenuItem
              disabled
              classes={{
                root: classes.selectMenuItem
              }}
            >
              Choose Topic
            </MenuItem>
            {topics.map(({id,name})=><MenuItem key={id}
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected
              }}
              value={id}
            >
              {name}
            </MenuItem>)}
          </Select>
        </FormControl>
      // </GridItem>
    );
  }
}

TopicList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(extendedFormsStyle)(TopicList)