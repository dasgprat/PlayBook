import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { subscribeToPlaylist, unsubscribeFromPlaylist } from '../actions/playlists';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';

const styles = theme => ({
    button: {},
    root: {
        display: 'flex',
        alignItems: 'center'
    }
});

class SubscribeButton extends Component {
    constructor(props) {
        super(props);

        this.onSubscribe = this.onSubscribe.bind(this);
        this.onUnsubscribe = this.onUnsubscribe.bind(this);
    }

    onSubscribe() {
        this.props.onSubscribe(this.props.playlistId);
    }

    onUnsubscribe() {
        this.props.onUnsubscribe(this.props.playlistId);
    }

    render() {
        const { classes, userId, authorId, subscribed } = this.props;

        if (userId === authorId) return '';

        return !subscribed ? (
            <Button className={classes.button} onClick={this.onSubscribe}>
                Subscribe
            </Button>
        ) : (
            <div className={[classes.root, classes.button]}>
                <IconButton>
                    <ThumbUpIcon />
                </IconButton>
                <IconButton>
                    <ThumbDownIcon />
                </IconButton>
                <IconButton onClick={this.onUnsubscribe}>
                    <UnsubscribeIcon />
                </IconButton>
            </div>
        );
    }
}

SubscribeButton.propTypes = {
    classes: PropTypes.object.isRequired,
    playlistId: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    subscribed: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => ({
    userId: state.user.id,
    subscribed: state.subscriptions.includes(props.playlistId),
    ...props
});

const mapDispatchToProps = dispatch => ({
    onSubscribe: playlistId => dispatch(subscribeToPlaylist(playlistId)).catch(console.log),
    onUnsubscribe: playlistId => dispatch(unsubscribeFromPlaylist(playlistId)).catch(console.log)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SubscribeButton));
