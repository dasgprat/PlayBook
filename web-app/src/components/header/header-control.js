import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderView from './header-view';
import { withCookies } from 'react-cookie';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userImage: null
        };

        this.onSearch = this.onSearch.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    onSearch(query) {
        console.log(query);
    }

    onLogout() {
        // TODO: for a more secure logout, we need to also blacklist the JWT on the server side
        this.props.cookies.remove('auth', { path: '/' });
        console.log(this.props.cookies);
        this.props.history.push('/login');
    }

    render() {
        const { match } = this.props;
        return (
            <HeaderView image={this.state.userImage} match={match} onSearch={this.onSearch} onLogout={this.onLogout} />
        );
    }
}

export default withCookies(withRouter(Header));
