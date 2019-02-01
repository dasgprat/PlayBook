import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './profile-styles';
import {
    Typography,
    TextField,
    Grid,
    RadioGroup,
    Radio,
    FormControlLabel,
    Button,
    FormLabel,
    FormControl
} from '@material-ui/core';
import { Link } from 'react-router-dom';

class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            gender: '',
            firstName: '',
            lastName: '',
            about: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSave() {
        this.props.onSave(this.state);
    }

    render() {
        const { classes, match } = this.props;
        return (
            <Grid container className={classes.root} direction="column" spacing={8}>
                <div className={classes.header}>
                    <Link to={`/home/${match.params.username}`} className={classes.link}>
                        <Button>Home</Button>
                    </Link>
                </div>
                <div className={classes.spacer} />
                <Grid item sm={4}>
                    <Typography variant="h5">Account Basics</Typography>
                    <FormControl className={`${classes.formGroup} ${classes.shortInput}`}>
                        <FormLabel>Email</FormLabel>
                        <TextField name="email" variant="outlined" onChange={this.handleChange} />
                    </FormControl>
                    <FormControl className={classes.formGroup}>
                        <FormLabel>Password</FormLabel>
                        <Button variant="contained" className={classes.password}>
                            Change Password
                        </Button>
                    </FormControl>
                    <FormControl className={classes.formGroup}>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="gender"
                            className={classes.gender}
                            value={this.state.gender}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="femail" control={<Radio />} label="Female" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                            <FormControlLabel value="" control={<Radio />} label="Prefer Not to Say" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid sm={4}>
                    <Typography variant="h5">Profile</Typography>
                    <FormControl className={`${classes.formGroup} ${classes.shortInput}`}>
                        <FormLabel>First Name</FormLabel>
                        <TextField onChange={this.handleChange} name="firstName" variant="outlined" />
                    </FormControl>
                    <FormControl className={`${classes.formGroup} ${classes.shortInput}`}>
                        <FormLabel>Last Name</FormLabel>
                        <TextField onChange={this.handleChange} name="lastName" variant="outlined" />
                    </FormControl>
                    <FormControl className={`${classes.formGroup} ${classes.shortInput}`}>
                        <FormLabel>About</FormLabel>
                        <TextField onChange={this.handleChange} name="about" variant="outlined" multiline rows={7} />
                    </FormControl>
                </Grid>
                <Grid sm={4}>
                    <FormControl className={classes.formGroup}>
                        <Button variant="contained" color="primary" onClick={this.onSave}>
                            Save Changes
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        );
    }
}

ProfileView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileView);
