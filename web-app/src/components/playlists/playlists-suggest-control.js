import React from 'react';
import PropTypes from "prop-types";
import PlaylistThumb from './playlist-thumb';
import {Redirect, withRouter} from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import api from "../api-gateway";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';
import {connect} from "react-redux";
import { suggestPlaylists } from "../actions";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        // overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    create: {
        margin: theme.spacing.unit,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    tile: {
        width: '380px!important',
        height: '100%!important',
        overflow: 'visible!important',
    },
    cssRoot: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
});

class PlaylistsSuggestController extends React.Component {
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
        this.props.suggestPlaylists();
    }

    render() {
        const { classes, suggestions } = this.props;
        if (this.state.redirectToReferrer === true) {
            return <Redirect to={`/playlist`}/>;
        }

        return (
            <div className={classes.root}>
                <GridList className={classes.gridList}  cols={2.5}>
                    {suggestions.map(playlist => (
                        <GridListTile key={playlist.id} className={classes.tile}>
                            <PlaylistThumb playlist={playlist}/>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    suggestions: state.suggestions
});

const mapDispatchToProps = dispatch => ({
    suggestPlaylists: () => {
        dispatch(suggestPlaylists())
    }
});

PlaylistsSuggestController.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PlaylistsSuggestController)));