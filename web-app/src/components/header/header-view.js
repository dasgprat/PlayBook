import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AuthControl from '../auth/auth-control';
import user from '../../model/user.model';
import styles from './header-styles';
import {
    TextField,
    InputAdornment,
    Avatar,
    MenuItem,
    Popper,
    Grow,
    Paper,
    Button,
    ClickAwayListener,
    MenuList,
    IconButton
} from '@material-ui/core';
import { Link } from 'react-router-dom';
<<<<<<< HEAD

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
=======
import SearchBar from "./search-bar";

>>>>>>> 457cf214dda2b1fc1bd462714f410860c5357d77

class HeaderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            anchor: null,
            open: false
        };

        this.onProfileAvatarClick = this.onProfileAvatarClick.bind(this);
        this.onProfileMenuClose = this.onProfileMenuClose.bind(this);
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
                <div className={classes.logoIcon}>
<<<<<<< HEAD
                    <Link to={`/home/${user.get().username}`} className={classes.link}>
                        <Button>PlayBook</Button>
                    </Link>
                </div>
                <SearchBar classes={classes} handleChange={this.handleChange} onSubmit={this.onSearchSubmit} />
=======
                    <Link to={`/home/${AuthControl.user.username}`} className={classes.link}>
                        <Button>PlayBook</Button>                 
                    </Link> 
                </div>               
                <SearchBar classes={classes} />
>>>>>>> 457cf214dda2b1fc1bd462714f410860c5357d77
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
                                            <Link className={classes.link} to={`/profile/${user.get().username}`}>
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
