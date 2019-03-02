import React from 'react';
import PropTypes from "prop-types";
import PlaylistThumb from './playlist-thumb';
import {Redirect, withRouter} from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import api from "../api-gateway";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing.unit,
        //flexWrap: 'wrap',
        //overflow: 'hidden',
        //display: 'flex',
        
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    create: {
        margin: theme.spacing.unit,
    },
    gridList: {
        flexWrap: 'nowrap',        
        height: 369,        
        transform: 'translateZ(0)',
    },
    cssRoot: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
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
        api.get(`/playlists?username=${username}`, callback);
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
        if (this.state.redirectToReferrer === true) {
            return <Redirect to={`/playlist`}/>;
        }

        return (
            <div className={classes.root}>
                <Grid container justify='center' alignItems="center" spacing={0}>
                    <Grid item xs={false}>
                        <Fab variant="extended" color="primary" aria-label="Add" className={classNames(classes.create, classes.cssRoot)}
                                                onClick={() => this.updateRedirectState()}>
                            <AddIcon className={classes.extendedIcon} />
                            Create Playlist                                                            
                        </Fab>                        
                    </Grid>
                </Grid>
                
                <Grid container className={classes.root}  spacing={32}>
                    {this.state.playlists.map(playlist => (
                        <Grid key={playlist.id} className={classes.demo} >
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