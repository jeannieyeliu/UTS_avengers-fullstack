import React from "react";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import UserAvatar from "../UserAvatar";
import ListButton from "../ListButton";
//import Button from "components/CustomButtons/Button.jsx";
import { Button as ReactButton, ButtonToolbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./TopBar.css";

class TopBar extends React.Component {
  render() {
    return (
      <AppBar position="fixed" color="inherit">
        <Toolbar variant="dense">
          <Typography
            style={{ flexGrow: 1 }}
            color="inherit"
            variant="h6"
            className="logo"
          >
            <Image src="/logo.png" />
            <Link to="/" className="logo">Avengers</Link>
          </Typography>
          <ListButton />
          <ButtonToolbar>
            <ReactButton className="btn-signin">
              <Link to="/signin">Log In</Link>
            </ReactButton>
            <ReactButton className="btn-signup">
              <Link to="/signup">Sign Up</Link>
            </ReactButton>
          </ButtonToolbar>
          <Link to="/create-post" >
            <Fab size="small" color="secondary" aria-label="edit" className="btn-create-post">
              <EditIcon />
            </Fab>
          </Link>
          <UserAvatar />
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
