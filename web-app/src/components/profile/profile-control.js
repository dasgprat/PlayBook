import React from 'react';
import ProfileView from './profile-view';
import AuthControl from '../auth/auth-control';
import api from '../api-gateway';
import { withRouter } from 'react-router-dom';
import user from '../../model/user.model';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: user.get()
        };

        this.onSave = this.onSave.bind(this);
    }

    onSave(values) {
        api.patch(`/users/${this.state.user.id}`, values, (err, res) => {
            if (err) return console.log(err);
            user.update(res.content);
            this.setState({ user: user.get() });
            this.props.history.push('/home/' + user.get().username);
        });
    }

    render() {
        const { match } = this.props;
        return <ProfileView match={match} onSave={this.onSave} user={this.state.user} />;
    }
}

export default withRouter(Profile);
