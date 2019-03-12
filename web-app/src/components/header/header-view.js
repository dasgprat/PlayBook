import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AuthControl from '../auth/auth-control';
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
import SearchBar from "./search-bar";


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
                    <Link to={`/home/${AuthControl.user.username}`} className={classes.link}>
                        <Button>PlayBook</Button>                 
                    </Link> 
                </div>               
                <SearchBar classes={classes} />
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
                                            <Link className={classes.link} to={`/profile/${AuthControl.user.username}`}>
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
