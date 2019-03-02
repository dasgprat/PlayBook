import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import api from '../api-gateway';

const styles = theme => ({
    button: {}
});

class SubscribeButton extends Component {
    constructor(props) {
        super(props);

        this.onSubscribe = this.onSubscribe.bind(this);
    }

    onSubscribe() {
        let data = { subscriberId: this.props.userId };
        api.post(`/playlists/${this.props.playlistId}/subscribers`, data, (err, res) => {
            if (err) return console.log('Failed to subscribe: ' + err.message);
            console.log(res.message);
        });
    }

    render() {
        const { classes, userId, authorId } = this.props;

        if (userId === authorId) return '';

        return (
            <Button className={classes.button} onClick={this.onSubscribe}>
                Subscribe
            </Button>
        );
    }
}

SubscribeButton.propTypes = {
    classes: PropTypes.object.isRequired,
    playlistId: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
};

export default withStyles(styles)(SubscribeButton);
