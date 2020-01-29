import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import "./LoginPage.css";

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
import Info from "components/Typography/Info.jsx";
import Primary from "components/Typography/Primary.jsx";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Lock from "@material-ui/icons/Lock";

//Connect to backend
import http from "services/httpService";
import config from "config";

//Local storage
import { isVerifiedUser } from "services/userAuthService";
import { Redirect, Link } from "react-router-dom";

//References:
//https://www.creative-tim.com/product/material-dashboard
//https://stackoverflow.com/questions/50766693/how-to-center-a-component-in-material-ui-and-make-it-responsive
//https://www.htmlgoodies.com/tutorials/html_401/article.php/3479661
//https://scotch.io/tutorials/validating-a-login-form-with-react
//https://programmingwithmosh.com/react/localstorage-react/
//https://github.com/chris0906/csa-frontend
//https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem

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

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };

    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: ""
      },
      isValid: {
        validEmail: false,
        validPassword: false
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
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

    //Get updated user information through saved variables - POST
    const userInfo = {
      email: this.state.email,
      password: this.state.password
    };

    //Post data to the backend with link provided from backend
    //Receive status from backend if the username or email existed in the database
    try {
      this.setState({ errorMsg: "" }); //Disappear everytime when the page is renewed
      const result = await http.post(config.loginApi, userInfo);
      //console.log("result", result);
      //Get the token from the field, store in the local storage
      localStorage.setItem("token", result.data.token);
      //if user authentication expires during operation then redirect to loginpage
      //and if login succeed, then redirect to where user wantted to go before
      const { state } = this.props.location;
      //Redirect users to go to where they intended to go prior to signin
      //Otherwise, stay on the landing page itself 
      if (result) this.props.history.push(state ? state.from.pathname : "/"); //If the result is true, go to the requested page, if not, stay on landing page
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
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
    } else if (name === "password") {
      //minimum input should be at least length of 8, as it has been checked at registration
      //No error messages pop up but the users will not be able to go to the next stage
      if (value.length >= 8) {
        formErrors.password = "";
        isValid.validPassword = true;
      } else {
        formErrors.password = "";
        isValid.validPassword = false;
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
    if (isVerifiedUser()) 
      return <Redirect to="/" />; //Direct to logged in page 
    
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
                  <h2 className={classes.cardTitle}>Sign in</h2>
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
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                      {formErrors.email.length > 0 && (
                        <span className="errorMessage">{formErrors.email}</span>
                      )}
                    </div>
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
                          autoComplete: "off",
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
                  </form>
                  <br />
                  <div className="validation">
                    {this.state.errorMsg ? this.state.errorMsg : null}
                  </div>
                  <br />
                  <div className={classes.right}>
                    <Info>
                      {" "}
                      <Link to="/forgot-password-information">
                        Forgot Password?
                      </Link>
                    </Info>
                  </div>
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <div className={classes.center}>
                    <Button
                      onClick={(e) => this.handleSubmit(e)}
                      round
                      color="primary"
                      size="large"
                      disabled={!isValid.validEmail || !isValid.validPassword}
                    >
                      Sign In
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardBody style={{ textAlign: "center" }}>
                  <div className={classes.center}>
                    <Primary>
                      New to Avengers? <a href="signup">Create an account</a>.
                    </Primary>
                    {/* <Notification /> */}
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

export default withStyles(loginPageStyle)(LoginPage);