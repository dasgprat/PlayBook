import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderView from './header-view';

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
        document.cookie = 'auth=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.props.history.push('/login');
    }

    render() {
        const { match } = this.props;
        return <HeaderView image={this.state.userImage} match={match} onSearch={this.onSearch} onLogout={this.onLogout} />;
    }
}

export default withRouter(Header);
