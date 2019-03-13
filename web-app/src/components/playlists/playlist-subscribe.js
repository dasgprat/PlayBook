import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { subscribeToPlaylist, unsubscribeFromPlaylist, likePlaylist, unlikePlaylist } from '../actions/playlists';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
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
        this.onLikeClick = this.onLikeClick.bind(this);
        this.onUnlikeClick = this.onUnlikeClick.bind(this);
    }

    onSubscribe() {
        this.props.onSubscribe(this.props.playlistId);
    }

    onUnsubscribe() {
        this.props.onUnsubscribe(this.props.playlistId);
    }

    onLikeClick() {
        this.props.onLike(this.props.playlistId);
    }

    onUnlikeClick() {
        this.props.onUnlike(this.props.playlistId);
    }

    render() {
        const { classes, userId, authorId, subscribed, liked } = this.props;

        if (userId === authorId) return '';

        return !subscribed ? (
            <Button className={classes.button} onClick={this.onSubscribe}>
                Subscribe
            </Button>
        ) : (
            <div className={[classes.root, classes.button]}>
                {liked ? (
                    <IconButton color="primary" onClick={this.onUnlikeClick}>
                        <ThumbUpIcon />
                    </IconButton>
                ) : (
                    <IconButton onClick={this.onLikeClick}>
                        <ThumbUpIcon />
                    </IconButton>
                )}
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
    ...props,
    userId: state.user.id,
    subscribed: state.subscriptions.includes(props.playlistId),
    liked: state.liked.includes(props.playlistId)
});

const mapDispatchToProps = dispatch => ({
    onSubscribe: playlistId => dispatch(subscribeToPlaylist(playlistId)).catch(console.log),
    onUnsubscribe: playlistId => dispatch(unsubscribeFromPlaylist(playlistId)).catch(console.log),
    onLike: playlistId => dispatch(likePlaylist(playlistId)).catch(console.log),
    onUnlike: playlistId => dispatch(unlikePlaylist(playlistId)).catch(console.log)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SubscribeButton));
