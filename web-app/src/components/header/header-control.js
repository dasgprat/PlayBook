import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderView from './header-view';
import { withCookies } from 'react-cookie';
import AuthControl from '../auth/auth-control';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userImage: null
        };

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        // TODO: for a more secure logout, we need to also blacklist the JWT on the server side
        this.props.cookies.remove('auth', { path: '/' });
        console.log(this.props.cookies);
        AuthControl.user = null;
        AuthControl.isAuthenticated = false;
        this.props.history.push('/login');
    }

    render() {
        const { match } = this.props;
        return (
            <HeaderView image={this.state.userImage} match={match} onLogout={this.onLogout} />
        );
    }
}

export default withCookies(withRouter(Header));
