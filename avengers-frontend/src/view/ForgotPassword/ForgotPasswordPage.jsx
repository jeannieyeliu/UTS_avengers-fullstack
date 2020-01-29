import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
//import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import "./ForgotPasswordPage.css";

//Core Components
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

// @material-ui/icons
import NotificationActive from "@material-ui/icons/NotificationsActive";

//References:
//https://www.creative-tim.com/product/material-dashboard
//https://stackoverflow.com/questions/45407771/link-cant-be-used-together-with-materialui


export class ForgotPasswordPage extends Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
          cardAnimaton: "cardHidden"
        }
    };

    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        this.timeOutFunction = setTimeout(
          function() {
            this.setState({ cardAnimaton: "" });
          }.bind(this),
          700
        );
      };
    
      componentWillUnmount() {
        clearTimeout(this.timeOutFunction);
        this.timeOutFunction = null;
      };

      render() {
        const { classes } = this.props;
        return (
            <>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`}>
                  <h2 className={classes.cardTitle}>Check Your Email to Reset Password</h2>
                  <br />
                  <GridItem container justify="center">
                  <InputAdornment position="center">
                          <NotificationActive className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                  </GridItem>
                </CardHeader>
                <CardBody>  
                  <div className={classes.center}>
                    <form justify="center">
                        <h4>An email has been sent to your email to reset your password</h4>
                    </form> 
                  </div>
                  <br/>
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
         </GridContainer>
      </>
        );
      }
}

export default withStyles(loginPageStyle)(ForgotPasswordPage);