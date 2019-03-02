import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon
} from 'react-share';
import user from '../../model/user.model';
import SubscribeButton from './playlist-subscribe';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        minWidth: 300,
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing.unit
    },
    heading: {
        padding: 0
    },
    subscribe: {
        //marginBottom: 80,
        margin: theme.spacing.unit * 2
    },
    buttonSubscribe: {
        marginLeft: 'auto'
    },
    section1: {
        margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
    },
    section2: {
        margin: theme.spacing.unit * 2
    },
    section3: {
        margin: `0 ${theme.spacing.unit}px`,
        display: 'flex',
        padding: 5
    },
    action: {
        margin: theme.spacing.unit
    },
    share: {
        //position: 'absolute',
        margin: theme.spacing.unit,
        cursor: 'pointer',
        display: 'inline-block'
    }
});

const title = 'View My Playlist';
const shareUrl = '';

class PlaylistThumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: '',
            redirectToReferrer: false,
            renderDeleteOperation: false,
            playlist_creator: ''
        };
        this.updateRedirectState = this.updateRedirectState.bind(this);
    }

    updateRedirectState(url) {
        this.setState({ redirectTo: url, redirectToReferrer: true });
    }

    render() {
        const { classes, playlist, match } = this.props;

        if (this.state.redirectToReferrer === true) {
            return <Redirect to={this.state.redirectTo} />;
        }

        if (this.state.renderDeleteOperation == true) {
            this.deletePlaylists(this.state.redirectTo, (err, res) => {
                window.location.reload();
                //this.props.history.push('/home/' + match.params.username);
                if (err) {
                    return this.setState({ redirectToReferrer: false, renderDeleteOperation: false });
                }
                //this.props.playlist=[];
            });
        }

        return (
            <Paper className={classes.root}>
                <div className={classes.section1}>
                    <Grid container alignItems="center">
                        <Grid item container xs={12} justify="space-between" className={classes.subscribe}>
                            <Grid item>
                                <div>
                                    <Typography color="primary" variant="subtitle1">
                                        {playlist.personal == true ? 'Private' : 'Public'}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.action}
                                    onClick={() => this.updateRedirectState(`/playlist/${playlist.id}`)}
                                >
                                    PLAY
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" noWrap>
                                {playlist.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">by {playlist.author.name}</Typography>
                        </Grid>
                    </Grid>
                </div>
                <Divider />
                <div className={classes.section2}>
                    <Tooltip title={playlist.description} aria-label="Description">
                        <Typography color="textSecondary" noWrap={true}>
                            {playlist.description}
                        </Typography>
                    </Tooltip>
                </div>
                <Divider />
                <div className={classes.section3}>
                    <FacebookShareButton
                        className={classes.share}
                        //url  = {`https://prateekdasgupta.me/playlist/${playlist.id}`}
                        url="https://prateekdasgupta.me/"
                        quote={`View My Playlist ${playlist.name}`}
                        //hashtag={`${playlist.name}`}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <LinkedinShareButton
                        //url  = {`https://prateekdasgupta.me/playlist/${playlist.id}`}
                        url="https://prateekdasgupta.me/"
                        //title = {`View My Playlist ${playlist.name}`}
                        //description={`${playlist.description}`}
                        className={classes.share}
                    >
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <TwitterShareButton
                        //url  = {`https://prateekdasgupta.me/playlist/${playlist.id}`}
                        url="https://prateekdasgupta.me/"
                        title={`View My Playlist ${playlist.name}`}
                        className={classes.share}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <SubscribeButton
                        playlistId={playlist.id}
                        authorId={playlist.author._id}
                        userId={user.get().id}
                        classes={{ button: classes.buttonSubscribe }}
                    />
                </div>
            </Paper>
        );
    }
}

PlaylistThumb.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlaylistThumb);
