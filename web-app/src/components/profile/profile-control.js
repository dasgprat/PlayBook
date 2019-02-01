import React from 'react';
import ProfileView from './profile-view';
import AuthControl from '../auth/auth-control';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: AuthControl.user
        };

        this.onSave = this.onSave.bind(this);
    }

    onSave(values) {
        console.log(values);
    }

    render() {
        const { match } = this.props;
        return <ProfileView match={match} onSave={this.onSave} user={this.state.user} />;
    }
}

export default Profile;
