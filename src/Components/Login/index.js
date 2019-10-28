import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

import { authGoogle } from "../Store/Auth/Actions";

const mapStateToProps = state => ({
  authorizing: state.auth.authorizing,
})

const mapDispatchToProps = {
  authGoogle
}

class Login extends Component {

  onGoogleAuth = async (token) => {
    const { authGoogle, history } = this.props;
    await authGoogle(token);
    history.push("/");
  }

  render() {
    const { authorizing } = this.props;
    return (
      <div>
        <Header />
        <Body
          loading={authorizing}
          onGoogleAuth={this.onGoogleAuth}
        />
        <Footer />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
