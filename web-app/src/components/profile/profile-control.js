import React from 'react';
import ProfileView from './profile-view';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.onSave = this.onSave.bind(this);
    }

    onSave(values) {
        console.log(values);
    }

    render() {
        const { match } = this.props;
        return <ProfileView match={match} onSave={this.onSave} />;
    }
}

export default Profile;
