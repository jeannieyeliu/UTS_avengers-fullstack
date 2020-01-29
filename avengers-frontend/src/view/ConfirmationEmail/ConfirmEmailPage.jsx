import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
//import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import "./ConfirmEmailPage.css";

//Core Components
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Muted from "components/Typography/Muted.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

//References:
//https://www.creative-tim.com/product/material-dashboard
//https://stackoverflow.com/questions/45407771/link-cant-be-used-together-with-materialui

export class ConfirmEmailPage extends Component {
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
                  <h2 className={classes.cardTitle}>Email Verification</h2>
                  <br />
                  <GridItem container justify="center">
                  <InputAdornment position="center">
                          <Email className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                  </GridItem>
                </CardHeader>
                <CardBody>  
                  <div className={classes.center}>
                    <form justify="center">
                        <h4>An email has been sent to your registered email to activate your Avengers account</h4>
                    </form> 
                  </div>
                  <br/>
                  <div className={classes.center}>
                  <Muted>
                      Not the correct email? {" "}
                      <a href="/signup">Click Here</a>.
                  </Muted>
                  </div>
                </CardBody>
              </Card>
            </form>
          </GridItem>
         </GridContainer>
      </>
        );
      }
}

export default withStyles(loginPageStyle)(ConfirmEmailPage);