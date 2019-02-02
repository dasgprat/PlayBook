import React from 'react';
import PropTypes from "prop-types";
import PlaylistThumb from './playlist-thumb';
import {Redirect, withRouter} from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import api from "../api-gateway";
import AuthControl from '../auth/auth-control';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing.unit * 2,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    create: {
        margin: theme.spacing.unit,
    },
});

class PlaylistsController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.match.params.username,
            playlists: [],
            redirectToReferrer: false
        };
        this.updateRedirectState = this.updateRedirectState.bind(this);
    }

    updateRedirectState() {
        this.setState({redirectToReferrer: true});
    }

    getPlaylists(username, callback) {
        api.get(`/user/${username}/playlist`, callback);
        // api.get(`/user/${username}/playlist/5c523fde15bf407420799e69`, callback);
    }

    componentDidMount() {
        if (this.state.username) {
            this.getPlaylists(this.state.username, (err, res) => {
                if (err) {
                    return this.setState({ playlists: [] });
                }
                return this.setState({ playlists: res });
            });
        }
    }

    render() {
        const { classes } = this.props;
        console.log('username: ', AuthControl.user);

        if (this.state.redirectToReferrer === true) {
            return <Redirect to={`/playlist`}/>;
        }

        return (
            <div className={classes.root}>
                <Grid container justify='center' alignItems="center" spacing={0}>
                    <Grid item xs={false}>
                        <Button variant="contained" color="primary" className={classes.create}
                                onClick={() => this.updateRedirectState()}>
                            Create Playlist
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify='center' spacing={32}>
                    {this.state.playlists.map(playlist => (
                        <Grid key={playlist.id} className={classes.demo} item xs={3}>
                            <PlaylistThumb playlist={playlist} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}

PlaylistsController.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(PlaylistsController));