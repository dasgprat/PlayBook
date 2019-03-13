import React from 'react';
import AuthView from './auth-view';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, verifyAuthentication, authenticateUser } from '../actions/user';
import { fetchSubscriptions, fetchLikedPlaylists } from '../actions/playlists';

class RegisterController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            age: null,
            username: '',
            password: ''
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
    }

    componentDidMount() {
        if (this.props.loggedIn == null) {
            this.props.onVerifyAuthentication();
        }
    }

    onNameChange(event) {
        this.setState({ name: event.target.value });
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    onAgeChange(event) {
        this.setState({ age: event.target.value });
    }

    onLoginFormSubmit(event) {
        event.stopPropagation();
        event.preventDefault();
        this.props.onRegister({
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            email: this.state.email,
            age: this.state.age
        });
    }

    render() {
        const { loggedIn, location, username, error } = this.props;

        if (loggedIn === true) {
            let pathname = location.state ? location.state.from.pathname : `/home/${username}`;
            return <Redirect to={{ pathname }} />;
        } else if (loggedIn === false) {
            return (
                <AuthView
                    action="register"
                    onLoginFormSubmit={this.onLoginFormSubmit}
                    onNameChange={this.onNameChange}
                    onEmailChange={this.onEmailChange}
                    onAgeChange={this.onAgeChange}
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
    location
});

const mapDispatchToProps = (dispatch, { history }) => ({
    onRegister: form =>
        dispatch(registerUser(form)).then(
            () => {
                dispatch(authenticateUser(form.username, form.password)).then(
                    () => {
                        history.push(`/home/${form.username}`);
                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            err => {
                console.log(err);
            }
        ),

    onVerifyAuthentication: () =>
        dispatch(verifyAuthentication()).then(
            ({ user }) => {
                history.push(`/home/${user.username}`);
            },
            err => {
                console.log(err);
            }
        )
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RegisterController)
);
