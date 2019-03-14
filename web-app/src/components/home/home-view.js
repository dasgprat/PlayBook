import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './home-styles';
import { CssBaseline } from '@material-ui/core';
import Header from '../header/header-control';
import PlaylistsSuggest from "../playlists/playlists-suggest-control";
import Playlists from '../playlists/playlists-control';
import Divider from '@material-ui/core/Divider';

class HomeView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <div>
                    <Header/>
                    <PlaylistsSuggest />
                    <Divider/>
                    <Playlists />
                </div>
                
            </div>
        );
    }
}

HomeView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeView);
