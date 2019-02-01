import React from 'react';
import AuthView from './auth-view';
import AuthControl from './auth-control';
import { withRouter } from 'react-router-dom';

class RegisterController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            age: null,
            username: '',
            password: '',
            error: null
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
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
        AuthControl.register(this.state, (err, res) => {
            if (err) {
                return this.setState({ error: err.message });
            }
            this.setState({ error: null });
            this.props.history.push(`/home/${AuthControl.user.username}`);
        });
    }

    render() {
        return (
            <AuthView
                action="register"
                onLoginFormSubmit={this.onLoginFormSubmit}
                onNameChange={this.onNameChange}
                onEmailChange={this.onEmailChange}
                onAgeChange={this.onAgeChange}
                onUsernameChange={this.onUsernameChange}
                onPasswordChange={this.onPasswordChange}
                error={this.state.error}
            />
        );
    }
}

export default withRouter(RegisterController);
