import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import api from '../api-gateway';
import Header from '../header/header-control';
import { CssBaseline, Table } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import user from '../../model/user.model';

const styles = theme => ({
    content: {
        width: '100%',
        minWidth: 350,
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper
    },
    subscribe: {
        margin: theme.spacing.unit * 2
        //marginBottom: 80,
    },
    section1: {
        margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
    },
    section2: {
        margin: theme.spacing.unit
    },
    chip: {
        margin: theme.spacing.unit
    },
    section3: {
        margin: theme.spacing.unit * 2
    },
    section4: {
        margin: theme.spacing.unit * 2
    },
    last: {
        margin: `0 ${theme.spacing.unit}px`
    },
    action: {
        margin: theme.spacing.unit
    }
});

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            playlist: null,
            redirectToReferrer: false,
            renderDeleteOperation: false
        };
        this.updateRedirectState = this.updateRedirectState.bind(this);
        this.updateDeleteState = this.updateDeleteState.bind(this);
    }

    updateRedirectState() {
        this.setState({ redirectToReferrer: true });
    }

    getPlaylist(id, callback) {
        api.get(`/playlists/${id}`, callback);
    }

    updateDeleteState(url, playlistAuthor) {
        this.setState({ redirectTo: url, renderDeleteOperation: true, playlist_creator: playlistAuthor });
    }

    deletePlaylists(url, callback) {
        api.delete(url, callback);
    }

    componentDidMount() {
        if (this.state.id) {
            this.getPlaylist(this.state.id, (err, res) => {
                //console.log(res);
                if (err) {
                    return this.setState({ playlist: null });
                }
                if (res == null) {
                    return <Redirect to={`/home/${user.username}`} />;
                }
                return this.setState({ playlist: res });
            });
        }
    }

    componentDidUpdate() {
        if (this.state.playlist == null) {
            return this.setState({ renderDeleteOperation: true });
        }
    }

    render() {
        const { classes,user} = this.props;
        const { playlist } = this.state;

        if (!playlist) {
            if (this.state.renderDeleteOperation == true) {
                return <Redirect to={`/home/${user.username}`} />;
            } else {
                return <div>Loading! </div>;
            }
        }

        if (this.state.redirectToReferrer === true) {
            return <Redirect to={`/playlist/${this.state.id}/edit`} />;
        }

        if (this.state.renderDeleteOperation == true) {
            this.deletePlaylists(this.state.redirectTo, (err, res) => {
                this.state.playlist = null;
                if (err) {
                    return this.setState({ redirectToReferrer: false, renderDeleteOperation: false });
                }
            });
        }

        return (
            <Grid container className={classes.root} direction="column" spacing={8}>
                <CssBaseline />

                <div>
                    <Header />
                </div>

                <Grid container justify="center" spacing={32}>
                    <div>
                        <Grid key={playlist.id} className={classes.demo}>
                            <Paper className={classes.content}>
                                <div className={classes.section1}>
                                    <Grid container alignItems="center">                                        
                                        {user.username == playlist.author.username ? (
                                            <Grid
                                                item
                                                container
                                                xs={12}
                                                justify="space-between"
                                                className={classes.subscribe}
                                            >
                                                <Grid item>
                                                    <Tooltip title="Edit Playlist" aria-label="Edit">
                                                        <IconButton
                                                            aria-label="Toggle password visibility"
                                                            color="primary"
                                                            onClick={() => this.updateRedirectState()}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete Playlist" aria-label="Delete">
                                                        <IconButton
                                                            aria-label="Toggle password visibility"
                                                            color="secondary"
                                                            onClick={() =>
                                                                this.updateDeleteState(
                                                                    `/playlists/${playlist.id}`,
                                                                    `${playlist.author}`
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        color="primary"
                                                        variant="subtitle1"
                                                        className={classes.action}
                                                    >
                                                        {playlist.personal == true ? 'Private' : 'Public'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        ) : (
                                            ''
                                        )}
                                        <Grid item xs={12} className={classes.section2}>
                                            <Typography variant="title">{playlist.name}</Typography>
                                        </Grid>
                                        <Grid item xs={12} className={classes.section2}>
                                            <Typography variant="subtitle1">by {playlist.author.name}</Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <Divider />
                                <div className={classes.section2}>
                                    {playlist.categories.map(category => (
                                        <Chip
                                            key={category.name}
                                            label={category.name}
                                            className={classes.chip}
                                            variant="outlined"
                                        />
                                    ))}
                                </div>
                                <Divider />
                                <div className={classes.section3}>
                                    <Typography color="textSecondary" className={classes.section3}>
                                        {playlist.description}
                                    </Typography>
                                </div>
                                <Divider />
                                <div className={classes.section4}>
                                    <Grid container direction="column">
                                        <Table>
                                            <TableBody className={classes.section4}>
                                                {playlist.links.map((link, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            className={classes.section4}
                                                        >
                                                            <Grid key={index} item xs zeroMinWidth>
                                                                <Typography color="primary">
                                                                    <a href={link}>{link}</a>
                                                                </Typography>
                                                            </Grid>                                                            
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                </div>
                                
                              
                                
                            </Paper>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

Playlist.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(Playlist)));
