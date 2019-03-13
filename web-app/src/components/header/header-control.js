import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderView from './header-view';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.onLogout(this.props.cookies);
    }

    render() {
        const { match, image, username } = this.props;
        return <HeaderView username={username} image={image} match={match} onLogout={this.onLogout} />;
    }
}

const mapStateToProps = (state, { cookies, match }) => ({
    username: state.user.username,
    image: state.user._links.avatar,
    cookies,
    match
});

const mapDispatchToProps = (dispatch, { history }) => ({
    onLogout: cookies =>
        dispatch(logoutUser(cookies)).then(() => {
            history.push('/login');
        })
});

export default withCookies(
    withRouter(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(Header)
    )
);
