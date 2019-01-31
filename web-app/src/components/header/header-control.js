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
        return <HeaderView onSearch={this.onSearch} />;
    }
}

export default withRouter(Header);
