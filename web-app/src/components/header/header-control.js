import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderView from './header-view';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(query) {
        console.log(query);
    }

    render() {
        const { match } = this.props;
        return <HeaderView match={match} onSearch={this.onSearch} />;
    }
}

export default withRouter(Header);
