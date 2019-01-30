import React from 'react';
import PropTypes from "prop-types";
import Playlist from './playlist-view';
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import api from "../api-gateway";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

class PlaylistsController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.match.params.username,
            playlists: []
        };
    }

    getPlaylists(username, callback) {
        api.get(`/user/${username}/playlist`, callback);
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

        return (
            <div className={classes.root}>
                <Grid container justify='center' spacing={32}>
                    {this.state.playlists.map(playlist => (
                        <Grid key={playlist.id} className={classes.demo} item xs={3}>
                            <Playlist playlist={playlist}/>
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