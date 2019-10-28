import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { auth } from "../../Store/Auth/Actions";

const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    auth
}

class Protected extends Component {
    async componentDidMount() {
        const {
            token,
            auth,
            history,
        } = this.props;
        if (!token) {
            history.push({
                pathname: "/dang-nhap",
                search: "?redirect=" + history.location.pathname
            });
        } else {
            await auth();
        }
    }
    render() {
        const { children, isAuthenticated, user } = this.props;
        if (!user) return null;
        if (!isAuthenticated) return <Redirect to="/403" />
        return (
            <Fragment>
                {children}
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Protected));