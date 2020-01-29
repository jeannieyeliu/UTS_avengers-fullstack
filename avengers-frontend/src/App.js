import React from "react";
import { Container } from "@material-ui/core";
import { Route, Switch, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import TopBar from "view/TopBar/TopBar";
import LandingPage from "view/LandingPage";
import CreatePost from "./view/CreatePost/CreatePost";
import RegistrationPage from "./view/Registration/RegistrationPage";
import ConfirmEmailPage from "./view/ConfirmationEmail/ConfirmEmailPage";
import LoginPage from "view/Login/LoginPage";
import ForgotPasswordPage from "view/ForgotPassword/ForgotPasswordPage";
import ForgotPasswordInformationPage from "view/ForgotPasswordInformation/ForgotPasswordInformationPage";
import ResetPasswordPage from "view/ResetPassword/ResetPasswordPage";
import PostDetail from "view/PostDetail/PostDetail";
import Notification from "view/NotificationToAnonymousUsers/NotificationPage";
import ProtectedRoute from "view/ProtectedRouter";
import "./App.css";

function App() {
  library.add(fab);
  return (
    <div>
      <TopBar />
      <Container maxWidth="md" className="main-body">
        <Switch>
          <Route path="/reset-password/:userID" component={ResetPasswordPage} />
          <Route
            path="/forgot-password-information"
            component={ForgotPasswordInformationPage}
          />
          <Route path="/confirm-email" component={ConfirmEmailPage} />
          <Route path="/signup" component={RegistrationPage} />
          <Route path="/signin" component={LoginPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route path="/to-anonymous-users" component={Notification} />
          <ProtectedRoute path="/postdetail/:id/" component={PostDetail} />
          <ProtectedRoute path="/create-post" component={CreatePost} />
          <Route path="/" component={LandingPage} />
          <Redirect to="/signin"/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;