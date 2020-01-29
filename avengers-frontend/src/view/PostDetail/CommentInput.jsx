import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import angry from "../../assets/emojis/angry.svg";
import happy from "../../assets/emojis/happy.svg";
import bored from "../../assets/emojis/bored.svg";
import cry from "../../assets/emojis/crying.svg";
import mad from "../../assets/emojis/mad.svg";
import Popover from "@material-ui/core/Popover";
import "./CommentInput.css";
import Typography from "@material-ui/core/Typography";
import { CardContent } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ImageIcon from "@material-ui/icons/Image";
import Fab from "@material-ui/core/Fab";
import CommentImg from "./CommentImg";

function CommentInput(props) {
  const [inputValue, setInputValue] = useState({ url: [] });

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleShowEmoji = ({ currentTarget: input }) => {
    // let emojiPath = "../../assets/emojis/" + input.name + ".svg";
    setInputValue({
      url: [
        ...inputValue.url,
        <img className="emoji" src={input.name} alt="" />
      ]
    });
    // inputValue.url.map(e => {
    //   console.log(e[0]);
    // });
    // console.log(inputValue.url[0]);
    // console.log(input.name);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  if (props.show) {
    return (
      <div>
        <Card>
          <CardBody>
            <CardHeader>
              <Fab color="secondary" size="small">
                <AddIcon
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                />
              </Fab>
              <Fab color="secondary" size="small">
                <CommentImg />
              </Fab>
            </CardHeader>
            <form>
              <CardContent>
                {inputValue.url.map(url => (
                  <p>{url}</p>
                ))}
              </CardContent>
            </form>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
            >
              {/* <paper>😊😁😂😍😢😜👏🎉</paper> */}
              <img
                className="emoji"
                name={angry}
                src={angry}
                alt=""
                onClick={handleShowEmoji}
              />
              <img
                className="emoji"
                name={happy}
                src={happy}
                alt=""
                onClick={handleShowEmoji}
              />
              <img
                className="emoji"
                name={cry}
                src={cry}
                alt=""
                onClick={handleShowEmoji}
              />
              <img
                className="emoji"
                name={bored}
                src={bored}
                alt=""
                onClick={handleShowEmoji}
              />
              <img
                className="emoji"
                name={mad}
                src={mad}
                alt=""
                onClick={handleShowEmoji}
              />
            </Popover>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div />;
  }
}

export default CommentInput;
