import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
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
    section3: {
        margin: `0 ${theme.spacing.unit}px`,
    },
    action: {
        margin: theme.spacing.unit,
    },
});

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }

    render() {
        const { classes, playlist } = this.props;

        return (
            <Paper className={classes.root}>
                <div className={classes.section1}>
                    <Grid container alignItems="center">
                        <Grid item container xs={12} justify="space-between" className={classes.subscribe}>
                            <Grid item>
                                <Typography/>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" className={classes.action}>
                                    Subscribe
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5">
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
                    <Typography color="textSecondary" noWrap={true}>
                        { playlist.description }
                    </Typography>
                </div>
                <Divider />
                <div className={classes.section3}>
                    <Button color="secondary" className={classes.action}>
                        Share
                    </Button>
                    <Button color="secondary" className={classes.action}>
                        Learn More
                    </Button>
                </div>
            </Paper>
        );
    }
}

Playlist.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Playlist);