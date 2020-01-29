import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
//import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import "./ResetPasswordPage.css";

//Core Components
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
//import Muted from "components/Typography/Muted.jsx";
//import Primary from "components/Typography/Primary.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

// @material-ui/icons
import Lock from "@material-ui/icons/Lock";

//Connect to backend
import http from "../../services/httpService";
import config from "config.json";
//References:
//https://www.creative-tim.com/product/material-dashboard
//https://stackoverflow.com/questions/50766693/how-to-center-a-component-in-material-ui-and-make-it-responsive
//https://www.htmlgoodies.com/tutorials/html_401/article.php/3479661
//https://scotch.io/tutorials/validating-a-login-form-with-react
//https://github.com/MyNameIsURL/react-form-validation-tutorial/tree/master/src
//https://stackoverflow.com/questions/14850553/javascript-regex-for-password-containing-at-least-8-characters-1-number-1-uppe
//https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
//https://stackoverflow.com/questions/51143800/how-to-set-match-password-in-react-js
//https://dev.to/moz5691/axios-in-reactjs-iah
//https://codesandbox.io/s/4203r4582w
//https://stackoverflow.com/questions/45407771/link-cant-be-used-together-with-materialui
//https://stackoverflow.com/questions/26069238/call-multiple-functions-onclick-reactjs

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");

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

export class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };

    this.state = {
      password: null,
      confirmPassword: null,
      formErrors: {
        password: "",
        confirmPassword: ""
      },
      isValid: {
        validPassword: false,
        validConfirmPassword: false
      },
      errorMsg: ""
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault(); //Prevent default action to occur
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

    //Get updated user information through saved variables - POST
    const userInfo = {
      password: this.state.password,
      userId: this.props.match.params.userID
    };

    //Post data to the backend with link provided from backend
    //Receive status from backend if the username or email existed in the database
    try {
      this.setState({ errorMsg: "" }); //Disappear everytime when the page is renewed
      const result = await http.post(config.resetPasswordApi, userInfo);
      if (result) window.location = "/signin"; //If the result is true, go to confirm-email page
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        //If there is exception and the status is 400
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
    if (name === "password") {
      if (passwordRegex.test(value) && value.length >= 8) {
        formErrors.password = "";
        isValid.validPassword = true;
      } else {
        formErrors.password =
          "minimum 8 characters with at least 1 digit and 1 lower case letter required";
        isValid.validPassword = false;
      }
    } else if (name === "confirmPassword") {
      if (e.target.value !== this.state.password) {
        formErrors.confirmPassword = "passwords do not match";
        isValid.validConfirmPassword = false;
      } else {
        formErrors.confirmPassword = "";
        isValid.validConfirmPassword = true;
      }
    }

    this.setState({ formErrors, [name]: value });
    this.setState({ isValid, [name]: value });
  };

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
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
          <GridItem xs={12} sm={12} md={6}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                >
                  <h2 className={classes.cardTitle}>Reset Your Password</h2>
                </CardHeader>
                <CardBody>
                  <form onSubmit={this.handleSubmit}>
                    <div className="password">
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          className:
                            formErrors.password.length > 0 ? "error" : null,
                          type: "password",
                          name: "password",
                          placeholder: "Password *",
                          onChange: (e) => this.handleChange(e),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Lock className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                      {formErrors.password.length > 0 && (
                        <span className="errorMessage">
                          {formErrors.password}
                        </span>
                      )}
                    </div>
                    <div className="confirmPassword">
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          className:
                            formErrors.confirmPassword.length > 0
                              ? "error"
                              : null,
                          type: "password",
                          name: "confirmPassword",
                          placeholder: "Confirm Password *",
                          onChange: (e) => this.handleChange(e),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Lock className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                      {formErrors.confirmPassword.length > 0 && (
                        <span className="errorMessage">
                          {formErrors.confirmPassword}
                        </span>
                      )}
                    </div>
                  </form>
                  <br />
                  <div className="verification">
                    {this.state.errorMsg ? this.state.errorMsg : null}
                  </div>
                  <br />
                  <div className={classes.center}>
                    <Button
                      onClick={(e) => this.handleSubmit(e)}
                      round
                      color="primary"
                      size="large"
                      disabled={
                        !isValid.validPassword ||
                        !isValid.validConfirmPassword
                      }
                    >
                      Reset Password
                    </Button>
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

export default withStyles(loginPageStyle)(ResetPasswordPage);
