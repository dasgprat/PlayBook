import {InputAdornment, TextField} from "@material-ui/core";
import React, { Component } from "react";
import SearchIcon from '@material-ui/icons/Search';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import styles from './header-styles';
import { searchPlaylists } from "../actions/playlists";

import PropTypes from "prop-types";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ""
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({ search: event.target.value })
    }

    onFormSubmit(event) {
        event.preventDefault();

        this.props.fetchSearchPlaylists(this.state.search);
    }

    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.onFormSubmit}>
                <TextField
                    className={classes.searchBar}
                    id="searchInput"
                    name="search"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        disableUnderline: true,
                        className: classes.searchInput,
                        placeholder: 'Search Playlists'
                    }}
                    onChange={this.onInputChange}
                />
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchSearchPlaylists: (search) => {
        dispatch(searchPlaylists(search))
    }
});

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(SearchBar));