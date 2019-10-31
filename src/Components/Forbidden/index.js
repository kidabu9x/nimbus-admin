import React, { Component } from "react";
import { connect } from "react-redux";
import { GoogleLogout } from "react-google-login";

import "./index.scss";
import { logout } from "../Store/Auth/Actions";

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = {
  logout
};

class Forbidden extends Component {
  logoutSuccess = () => {
    const { logout } = this.props;
    logout({
      reload: false
    });
    window.location.href = "/dang-nhap";
  };

  render() {
    const { token } = this.props;
    return (
      <div className="container">
        <div className="hover">
          <div className="background">
            <div className="door">403</div>
            <div className="rug"></div>
          </div>
          <div className="foreground">
            <div className="bouncer">
              <div className="head">
                <div className="neck"></div>
                <div className="eye left"></div>
                <div className="eye right"></div>
                <div className="ear"></div>
              </div>
              <div className="body"></div>
              <div className="arm"></div>
            </div>
            <div className="poles">
              <div className="pole left"></div>
              <div className="pole right"></div>
              <div className="rope"></div>
            </div>
          </div>
        </div>
        {token ? (
          <GoogleLogout
            className="button"
            clientId="618592701479-s18h0uo27etuful029664069uubo4ho1.apps.googleusercontent.com"
            buttonText="Sử dụng tài khoản khác"
            onLogoutSuccess={this.logoutSuccess}
          />
        ) : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forbidden);
