import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './header-styles';
import {
    TextField,
    InputAdornment,
    Avatar,
    MenuItem,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
    IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const SearchBar = ({ classes, onSubmit, handleChange }) => (
    <form onSubmit={onSubmit}>
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
            onChange={handleChange}
        />
    </form>
);

const LogoText = ({ classes }) => (
    <Typography className={classes.typography} variant="h4" color="inherit">
        Playbook
    </Typography>
);

class HeaderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            anchor: null,
            open: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onProfileAvatarClick = this.onProfileAvatarClick.bind(this);
        this.onProfileMenuClose = this.onProfileMenuClose.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSearchSubmit(e) {
        e.preventDefault();
        this.props.onSearch(this.state.search);
        return false;
    }

    onProfileAvatarClick(e) {
        this.setState({ open: !this.state.open });
    }

    onProfileMenuClose() {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({ open: false });
    }

    render() {
        const { classes, match, image, onLogout } = this.props;
        return (
            <div className={classes.header}>
                <LogoText classes={classes} />
                <SearchBar classes={classes} handleChange={this.handleChange} onSubmit={this.onSearchSubmit} />
                <div className={classes.profileAvatarWrapper}>
                    <IconButton
                        buttonRef={node => {
                            this.anchorEl = node;
                        }}
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={this.onProfileAvatarClick}
                    >
                        <Avatar className={classes.avatar} src={image || '/assets/no-avatar.png'}>
                            Toggle Menu Grow
                        </Avatar>
                    </IconButton>
                    <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={this.onProfileMenuClose}>
                                        <MenuList>
                                            <Link className={classes.link} to={`/profile/${match.params.username}`}>
                                                <MenuItem onClick={this.onProfileMenuClose}>Profile</MenuItem>
                                            </Link>
                                            <MenuItem onClick={onLogout}>Logout</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        );
    }
}

HeaderView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HeaderView);
