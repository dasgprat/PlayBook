import React from 'react';
import PropTypes from "prop-types";
import PlaylistThumb from './playlist-thumb';
import {Redirect, withRouter} from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';
import {connect} from "react-redux";
import { fetchPlaylists } from "../actions";

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
});

class PlaylistsController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.match.params.username,
            redirectToReferrer: false
        };
        this.updateRedirectState = this.updateRedirectState.bind(this);
    }

    updateRedirectState() {
        this.setState({redirectToReferrer: true});
    }

    componentDidMount() {
        this.props.fetchPlaylists();
    }

    render() {
        const { classes, playlists } = this.props;
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
                    {playlists.map(playlist => (
                        <Grid key={playlist.id} className={classes.demo} >
                            <PlaylistThumb playlist={playlist} />
                        </Grid>
                    ))}
                </Grid>                
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    playlists: state.playlists
});

const mapDispatchToProps = dispatch => ({
    fetchPlaylists: () => {
        dispatch(fetchPlaylists())
    }
});

PlaylistsController.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PlaylistsController)));