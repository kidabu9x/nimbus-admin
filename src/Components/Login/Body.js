import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Logo from "../../logo.svg";

const styles = theme => ({
  root: {
    display: "table",
    height: "100vh",
    width: "100%"
  },
  wrapper: {
    display: "table-cell",
    verticalAlign: "middle"
  },
  container: {
    padding: theme.spacing(5, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  progressBar: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100vw",
  },
  logo: {
    marginBottom: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(3)
  }
})

class Body extends Component {
  loginSuccess = (response) => {
    this.props.onGoogleAuth(response.tokenId);
  }

  loginFailure = (response) => {
  }

  render() {
    const {
      classes,
      loading,
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          {loading ?
            <LinearProgress className={classes.progressBar} />
            : null
          }
          <div className={classes.container}>
            <div className={classes.logo}>
              <img src={Logo} alt="logo" width={80} />
            </div>
            <Typography variant="h6" className={classes.title}>
              Đăng nhập
            </Typography>
            <GoogleLogin
              clientId="618592701479-s18h0uo27etuful029664069uubo4ho1.apps.googleusercontent.com"
              buttonText="Đăng nhập với Google"
              disabled={loading}
              onSuccess={this.loginSuccess}
              onFailure={this.loginFailure}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Body);
