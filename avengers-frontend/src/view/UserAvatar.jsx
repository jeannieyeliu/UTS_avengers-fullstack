import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./UserAvatar.css";
class UserAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "http://picsum.photos/100",
      IsSignIn: true
    };
  }

  signClick() {
    this.setState({ IsSignIn: true });
  }

  render() {
    const { IsSignIn } = this.state;
    let avatar;
    if (IsSignIn) {
      avatar = <Avatar src={this.state.imageUrl} />;
    } else {
      avatar = <div />;
    }
    return <div className="avatar">{avatar}</div>;
  }
}

export default UserAvatar;
