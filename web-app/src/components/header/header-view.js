import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './header-styles';
import { TextField, InputAdornment, Avatar } from '@material-ui/core';
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
                placeholder:"Search Playlists"
            }}
            onChange={handleChange}
        />
    </form>
);

const LogoText = ({classes}) => (    
    <Typography className={classes.typography} variant="h4" color="inherit">
        Playbook
    </Typography>
    
);

const ProfileAvatar = ({ classes, image, username }) => (
    <Link to={`/profile/${username}`}>
        <Avatar className={classes.avatar} src={image || '/assets/no-avatar.png'}>
            User
        </Avatar>
    </Link>
);

class HeaderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSearchSubmit(e) {
        e.preventDefault();
        this.props.onSearch(this.state.search);
        return false;
    }

    render() {
        const { classes, match } = this.props;
        return (
            <div className={classes.header}>                                
                <LogoText classes ={classes} />
                <SearchBar classes={classes} handleChange={this.handleChange} onSubmit={this.onSearchSubmit} />
                <ProfileAvatar classes={classes} username={match.params.username} />
            </div>
        );
    }
}

HeaderView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HeaderView);
