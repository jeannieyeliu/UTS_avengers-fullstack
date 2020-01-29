import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import "./ForgotPasswordInformationPage.css";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
//import Muted from "components/Typography/Muted.jsx";

// @material-ui/icons
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Email from "@material-ui/icons/Email";

//Connect to backend
import http from "services/httpService";
import config from "config";

//References:
//https://www.creative-tim.com/product/material-dashboard
//https://stackoverflow.com/questions/50766693/how-to-center-a-component-in-material-ui-and-make-it-responsive
//https://www.htmlgoodies.com/tutorials/html_401/article.php/3479661
//https://scotch.io/tutorials/validating-a-login-form-with-react

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate the form was filled out
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate form errors being empty
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

export class ForgotPasswordInformationPage extends Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };

    this.state = {
      email: null,
      formErrors: {
        email: ""
      },
      isValid: {
        validEmail: false
      },
      errorMsg: ""
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault(); //Prevent default action to occur

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

    //Get updated user information through saved variables - POST
    const userInfo = {
      email: this.state.email
    };

    //Post data to the backend with link provided from backend
    //Receive status from backend if the username or email existed in the database
    try {
      this.setState({ errorMsg: "" }); //Disappear everytime when the page is renewed
      const result = await http.post(config.forgotPasswordApi, userInfo);
      if (result) this.props.history.push("/forgot-password"); //If the result is true, go to forgot-password page
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        //If there is exception and the status is 404
        this.setState({ errorMsg: ex.response.data }); //Update errorMsg value
      }
    }
  };

  //Handle user inputs and check validations
  handleChange = (e) => {
    e.preventDefault(); //Prevent default action to occur
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors }; //Make a copy of form errors and modify values
    let isValid = { ...this.state.isValid };

    //Validate error forms and check validations
    if (name === "email") {
      //minimum input: a@a.uk
      //No error messages pop up but the users will not be able to go to the next stage
      if (value.length > 5) {
        formErrors.email = "";
        isValid.validEmail = true;
      } else {
        formErrors.email = "";
        isValid.validEmail = false;
      }
    }

    this.setState({ formErrors, [name]: value });
    this.setState({ isValid, [name]: value });
  };

  componentDidMount() {
    // Add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  render() {
    const { classes } = this.props;
    const { formErrors, isValid } = this.state;
    return (
      <>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={5}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                >
                  <h2 className={classes.cardTitle}>
                    Enter Your Email Address
                  </h2>
                </CardHeader>
                <CardBody>
                  <form onSubmit={this.handleSubmit}>
                    <div className="email">
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          className:
                            formErrors.email.length > 0 ? "error" : null,
                          type: "email",
                          name: "email",
                          placeholder: "Email *",
                          onChange: (e) => this.handleChange(e),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                      {formErrors.email.length > 0 && (
                        <span className="errorMessage">{formErrors.email}</span>
                      )}
                    </div>
                  </form>
                  <br />
                  <div className="validation">
                    {this.state.errorMsg ? this.state.errorMsg : null}
                  </div>
                  <br />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <div className={classes.center}>
                    <Button
                      onClick={(e) => this.handleSubmit(e)}
                      round
                      color="primary"
                      size="large"
                      disabled={!isValid.validEmail}
                    >
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

export default withStyles(loginPageStyle)(ForgotPasswordInformationPage);
