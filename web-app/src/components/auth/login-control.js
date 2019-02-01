import React from 'react';
import AuthView from './auth-view';
import AuthControl from './auth-control';
import { withRouter, Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(properties) {
        super(properties);

        this.state = {
            username: '',
            password: '',
            error: null,
            loggedIn: null
        };

        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    componentDidMount() {
        AuthControl.verify(err => {
            if (err) {
                return this.setState({ loggedIn: false });
            }
            this.setState({ loggedIn: true });
        });
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
        AuthControl.authenticate(this.state.username, this.state.password, (err, res) => {
            if (err) {
                return this.setState({ error: err.message });
            }
            this.setState({ error: null });
            this.props.history.push(`/home/${AuthControl.user.username}`);
        });
    }

    render() {
        if (this.state.loggedIn === true) {
            let pathname = this.props.location.state
                ? this.props.location.state.from.pathname
                : `/home/${AuthControl.user.username}`;
            return <Redirect to={{ pathname }} />;
        } else if (this.state.loggedIn === false) {
            return (
                <AuthView
                    action={'login'}
                    onLoginFormSubmit={this.onLoginFormSubmit}
                    onUsernameChange={this.onUsernameChange}
                    onPasswordChange={this.onPasswordChange}
                    error={this.state.error}
                />
            );
        } else {
            return <div />;
        }
    }
}

export default withRouter(Login);
