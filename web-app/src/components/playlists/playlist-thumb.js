import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {Redirect} from "react-router-dom";
import api from "../api-gateway";
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing.unit,
    },
    heading: {
        padding: 0,
    },
    subscribe: {
        //marginBottom: 80,
        margin: theme.spacing.unit * 2,
    },
    section1: {
        margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    },
    section2: {
        margin: theme.spacing.unit * 2,
    },
    section3: {
        margin: `0 ${theme.spacing.unit}px`,
    },
    action: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class PlaylistThumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: "",
            redirectToReferrer: false,
            renderDeleteOperation: false,
            playlist_creator: ""
        };
        this.updateRedirectState = this.updateRedirectState.bind(this);
        this.updateDeleteState = this.updateDeleteState.bind(this);
    }

    updateRedirectState(url) {
        this.setState({redirectTo: url, redirectToReferrer: true});
    }

    updateDeleteState(url,playlistAuthor) {
        this.setState({redirectTo: url, renderDeleteOperation: true, playlist_creator: playlistAuthor});
    }

    deletePlaylists(url, callback) {
        //api.get(`/user/${username}/playlist`, callback);
        // api.get(`/user/${username}/playlist/5c523fde15bf407420799e69`, callback);
        api.delete(url,callback);
        
        
    }

    render() {
        const { classes, playlist } = this.props;

        if (this.state.redirectToReferrer === true) {
            return <Redirect to={this.state.redirectTo}/>;
        }

        if (this.state.renderDeleteOperation == true) {                        
            this.deletePlaylists(this.state.redirectTo, (err, res) => {
                window.location.reload();                
                //this.props.history.push('/home/' + match.params.username);
                if (err) {                                       
                    return this.setState({redirectToReferrer: false,renderDeleteOperation: false});
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
                                    <Typography color="primary" variant ="subtitle1">
                                        {playlist.personal==true ? "Private" : "Public"}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary" className={classes.action}
                                    onClick={() => this.updateRedirectState(`/playlist/${playlist.id}`)}>
                                    PLAY                              
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h3">
                                { playlist.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                by { playlist.author }
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <Divider />
                <div className={classes.section2}>
                    <Typography color="textSecondary" noWrap={true}>
                        { playlist.description }
                    </Typography>
                </div>
                <Divider />
                <div className={classes.section3}>
                    <Button color="secondary" className={classes.action}
                            onClick={() => this.updateDeleteState(`/playlist/${playlist.id}`,`${playlist.author}`)}>
                        Delete                        
                    </Button>
                    <Button color="secondary" className={classes.action}
                            onClick={() => this.updateDeleteState(`/playlist/${playlist.id}`,`${playlist.author}`)}>
                        Share                        
                    </Button>
                </div>
            </Paper>
        );
    }
}

PlaylistThumb.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlaylistThumb);
