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
            loggedIn: false
        };

        AuthControl.verify(err => {
            if (!err) {
                this.setState({ loggedIn: true });
            }
        });

        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    componentDidMount() {
        
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
            this.props.history.push('/home');
        });
    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to={{pathname: '/home'}} />;
        }

        return (
            <AuthView
                action={'login'}
                onLoginFormSubmit={this.onLoginFormSubmit}
                onUsernameChange={this.onUsernameChange}
                onPasswordChange={this.onPasswordChange}
                error={this.state.error}
            />
        );
    }
}

export default withRouter(Login);
