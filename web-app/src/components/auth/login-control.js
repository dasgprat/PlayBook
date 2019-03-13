import React from 'react';
import AuthView from './auth-view';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateUser, verifyAuthentication } from '../actions/user';
import { fetchSubscriptions } from '../actions/playlists';

class Login extends React.Component {
    constructor(properties) {
        super(properties);

        this.state = {
            username: '',
            password: ''
        };

        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    componentDidMount() {
        if (this.props.loggedIn === null) {
            this.props.onVerifyAuthentication();
        }
    }

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    onLoginFormSubmit(event) {
        event.stopPropagation();
        event.preventDefault();
        this.props.onLogin(this.state.username, this.state.password);
    }

    render() {
        const { loggedIn, location, username, error } = this.props;

        if (loggedIn === true) {
            let pathname = location.state ? location.state.from.pathname : `/home/${username}`;
            return <Redirect to={{ pathname }} />;
        } else if (loggedIn === false) {
            return (
                <AuthView
                    action="login"
                    onLoginFormSubmit={this.onLoginFormSubmit}
                    onUsernameChange={this.onUsernameChange}
                    onPasswordChange={this.onPasswordChange}
                    error={error}
                />
            );
        } else {
            return <div />;
        }
    }
}

const mapStateToProps = (state, { location }) => ({
    loggedIn: state.authenticated,
    username: state.user.username,
    location,
    error: state.error
});

const getUserSubscriptions = (dispatch, history, username) =>
    dispatch(fetchSubscriptions()).then(
        () => {
            history.push(`/home/${username}`);
        },
        err => {
            console.log(err);
        }
    );

const mapDispatchToProps = (dispatch, { history }) => ({
    onLogin: (username, password) =>
        dispatch(authenticateUser(username, password)).then(
            () => getUserSubscriptions(dispatch, history, username),
            err => {
                console.log(err);
            }
        ),

    onVerifyAuthentication: () =>
        dispatch(verifyAuthentication()).then(
            ({ user }) => getUserSubscriptions(dispatch, history, user.username),
            err => console.log(err)
        )
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login)
);
