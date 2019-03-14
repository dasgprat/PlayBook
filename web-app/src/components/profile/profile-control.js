import React from 'react';
import ProfileView from './profile-view';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../actions/user';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.onSave = this.onSave.bind(this);
    }

    onSave(values) {
        this.props.onSave(values, this.props.user.username);
    }

    render() {
        const { match, user } = this.props;
        return <ProfileView match={match} onSave={this.onSave} user={user} />;
    }
}

const mapStateToProps = (state, { match }) => ({
    user: state.user,
    match
});

const mapDispatchToProps = (dispatch, { history }) => ({
    onSave: (values, username) =>
        dispatch(updateUser(values)).then(
            () => {
                history.push(`/home/${username}`);
            },
            err => {
                console.log(err);
            }
        )
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Profile)
);
