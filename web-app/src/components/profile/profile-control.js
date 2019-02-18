import React from 'react';
import ProfileView from './profile-view';
import AuthControl from '../auth/auth-control';
import api from '../api-gateway';
import { withRouter } from 'react-router-dom';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: AuthControl.user
        };

        this.onSave = this.onSave.bind(this);
    }

    onSave(values) {
        api.patch(`/users/${AuthControl.user.id}`, values, (err, res) => {
            if (err) return console.log(err);
            AuthControl.user = res.content;
            this.props.history.push('/home/' + AuthControl.user.username);
        });
    }

    render() {
        const { match } = this.props;
        return <ProfileView match={match} onSave={this.onSave} user={this.state.user} />;
    }
}

export default withRouter(Profile);
