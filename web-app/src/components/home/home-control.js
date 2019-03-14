import React from 'react';
import HomeView from './home-view';
import { withRouter } from 'react-router-dom';
import { fetchSubscriptions, fetchLikedPlaylists } from '../actions/playlists';
import { connect } from 'react-redux';

class HomeController extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { onFetchSubscriptions, onFetchLikedPlaylists } = this.props;
        onFetchSubscriptions();
        onFetchLikedPlaylists();
    }

    render() {
        return <HomeView />;
    }
}

const mapDispatchToProps = dispatch => ({
    onFetchSubscriptions: () => dispatch(fetchSubscriptions()),
    onFetchLikedPlaylists: () => dispatch(fetchLikedPlaylists())
});

export default connect(
    null,
    mapDispatchToProps
)(withRouter(HomeController));
