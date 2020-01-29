import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
//import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import "./NotificationPage.css";

//Core Components
// @material-ui/core components
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withRouter } from 'react-router-dom';

//References:
//https://www.creative-tim.com/product/material-dashboard
//https://stackoverflow.com/questions/45407771/link-cant-be-used-together-with-materialui
//https://stackoverflow.com/questions/53128022/react-exporting-withrouter-and-withstyles-error
//https://stackoverflow.com/questions/46681387/react-router-v4-how-to-go-back
//https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
//https://material-ui.com/api/button-group/


export class NotificationPage extends Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
          cardAnimaton: "cardHidden"
        }
        this.goBack = this.goBack.bind(this);
    };

    componentDidMount() {
        //Add a hidden class to the card and after 700 ms we delete it and the transition appears
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

      handleRouteToSignIn () {
        window.location = "/signin"; 
      }

      goBack(){
        this.props.history.goBack();
    } 

      render() {
        const { classes } = this.props;
        return (
          <>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <form>
                  <Card login className={classes[this.state.cardAnimaton]}>
                    <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`}>
                      <h2>Please sign in to proceed... </h2>
                    </CardHeader>
                    <CardBody>  
                    <div className={classes.left}>
                      <ButtonGroup fullWidth aria-label="full width outlined button group">
                        <Button 
                          //className="btn-next"
                          onClick={this.handleRouteToSignIn}
                          round
                          color="info"            
                        >
                          take me to sign in page
                        </Button>
                        <Button
                          //className="btn-prev"
                          onClick={() => this.props.history.goBack()}
                          round
                          color="white"
                        >
                          I don't want to sign in
                        </Button>
                      </ButtonGroup> 
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

export default withRouter((withStyles(loginPageStyle)(NotificationPage)));