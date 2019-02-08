import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import api from "../api-gateway";
import { TextField, InputAdornment, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    content: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
    },
    subscribe: {
        marginBottom: 80,
    },
    section1: {
        margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    },
    section2: {
        margin: theme.spacing.unit * 2,
    },
    chip: {
        margin: theme.spacing.unit,
    },
    section3: {
        margin: theme.spacing.unit * 2,
    },
    section4: {
        margin: theme.spacing.unit * 2,
    },
    last: {
        margin: `0 ${theme.spacing.unit}px`,
    },
    action: {
        margin: theme.spacing.unit
    },
    header: {
        backgroundColor: theme.palette.primary.light,
        height: 50,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 999
    },
    spacer: {
        height: 50
    },
});

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            playlist: null,
            redirectToReferrer: false
        };
        this.updateRedirectState = this.updateRedirectState.bind(this);
    }

    updateRedirectState() {
        this.setState({redirectToReferrer: true});
    }

    getPlaylist(id, callback) {
        console.log(`view: /playlist/${id}`);
        api.get(`/playlist/${id}`, callback);
    }

    componentDidMount() {
        if (this.state.id) {
            this.getPlaylist(this.state.id, (err, res) => {
                if (err) {
                    return this.setState({ playlist: null });
                }
                return this.setState({ playlist: res });
            });
        }
    }

    render() {
        const { classes } = this.props;
        const { playlist } = this.state;

        if (!playlist) {
            return (
                <div>Loading!</div>
            );
        }

        if (this.state.redirectToReferrer === true) {
            return <Redirect to={`/playlist/${this.state.id}/edit`}/>;
        }

        return (
            
            <Grid container className={classes.root} direction="column" spacing={8}>
                <div className={classes.header}>
                    <Link to={`/home/${playlist.author}`} className={classes.link}>
                        <Button>Home</Button>
                    </Link>
                </div> 
                <div className={classes.spacer} />             
                <Grid container justify='center' spacing={32}>                                       
                    <div>
                        <Grid key={playlist.id} className={classes.demo}>
                        <Paper className={classes.content}>
                            <div className={classes.section1}>
                                <Grid container alignItems="center">
                                    <Grid item container xs={12} justify="space-between" className={classes.subscribe}>
                                        <Grid item>
                                            <Button variant="contained" color="primary" className={classes.action}
                                                onClick={() => this.updateRedirectState()}>
                                                Edit
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary" className={classes.action}>
                                                Subscribe
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="title">
                                            { playlist.name }
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
                                { playlist.categories.map(category => (
                                    <Chip key={category.name} label={category.name} className={classes.chip} variant="outlined" />
                                ))}
                            </div>
                            <Divider />
                            <div className={classes.section3}>
                                <Typography color="textSecondary" noWrap={true}>
                                    { playlist.description }
                                </Typography>
                            </div>
                            <Divider />
                            <div className={classes.section4}>
                                <Grid container direction="column">
                                    {playlist.links.map(link => (
                                        <Grid key={link} item xs={3}>
                                            <a href={link}>
                                                { link }
                                            </a>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                            <Divider />                            
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

export default withRouter(withStyles(styles)(Playlist));
