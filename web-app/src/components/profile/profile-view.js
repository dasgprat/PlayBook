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
    FormControl,
    Chip
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const SkillChips = ({ classes, interests: skills, onDelete }) => (
    <div className={classes.skillChipsContainer}>
        {skills.length > 0 ? (
            skills.map((i, index) => (
                <Chip
                    key={index}
                    className={classes.skillChip}
                    label={i}
                    color="default"
                    variant="outlined"
                    onDelete={() => onDelete(i)}
                />
            ))
        ) : (
            <Typography>Add items below</Typography>
        )}
    </div>
);

class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        const { user } = this.props;

        this.state = {
            email: user.contact.email,
            gender: user.gender || '',
            name: user.name,
            about: user.about,
            interested: user.skills.interested || [],
            currentInterested: '',
            experienced: user.skills.experienced || [],
            currentExperienced: '',
            changed: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onInterestKeyPress = this.onInterestKeyPress.bind(this);
        this.onExperienceKeyPress = this.onExperienceKeyPress.bind(this);
        this.onInterestDelete = this.onInterestDelete.bind(this);
        this.onExperienceDelete = this.onExperienceDelete.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value, changed: true });
    }

    onInterestKeyPress(e) {
        if (e.key === 'Enter') {
            this.setState({ interested: [...this.state.interested, this.state.currentInterested] });
            this.state.currentInterested = '';
        }
    }

    onExperienceKeyPress(e) {
        if (e.key === 'Enter') {
            this.setState({ experienced: [...this.state.experienced, this.state.currentExperienced] });
            this.state.currentExperienced = '';
        }
    }

    onInterestDelete(label) {
        this.setState({ interested: this.state.interested.filter(i => i !== label) });
    }

    onExperienceDelete(label) {
        this.setState({ experienced: this.state.experienced.filter(e => e !== label) });
    }

    onSave() {
        this.props.onSave(this.state);
    }

    render() {
        const { classes, match } = this.props;
        return (
            <Grid container className={classes.root} direction="column" spacing={8} alignItems="center">
                <div className={classes.header}>
                    <Link to={`/home/${match.params.username}`} className={classes.link}>
                        <Button>Home</Button>
                    </Link>
                    <FormControl className={classes.saveButton}>
                        <Button variant="contained" onClick={this.onSave} disabled={!this.state.changed}>
                            Save Changes
                        </Button>
                    </FormControl>
                </div>
                <div className={classes.spacer} />
                <Grid item sm={2}>
                    <Typography variant="h5">Account Basics</Typography>
                    <FormControl className={`${classes.formGroup} ${classes.shortInput}`}>
                        <FormLabel>Email</FormLabel>
                        <TextField
                            name="email"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
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
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                            <FormControlLabel value="" control={<Radio />} label="Prefer Not to Say" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item sm={2}>
                    <Typography variant="h5">Profile</Typography>
                    <FormControl className={`${classes.formGroup} ${classes.shortInput}`}>
                        <FormLabel>Name</FormLabel>
                        <TextField
                            onChange={this.handleChange}
                            name="firstName"
                            variant="outlined"
                            value={this.state.name}
                        />
                    </FormControl>
                    <FormControl className={`${classes.formGroup} ${classes.shortInput}`}>
                        <FormLabel>About</FormLabel>
                        <TextField
                            onChange={this.handleChange}
                            name="about"
                            variant="outlined"
                            multiline
                            rows={7}
                            value={this.state.about}
                        />
                    </FormControl>
                    <FormControl className={`${classes.formGroup} ${classes.shortInput}`}>
                        <FormLabel>Interests</FormLabel>
                        <SkillChips
                            classes={classes}
                            interests={this.state.interested}
                            onDelete={this.onInterestDelete}
                        />
                        <TextField
                            onKeyPress={this.onInterestKeyPress}
                            onChange={this.handleChange}
                            name="currentInterested"
                            value={this.state.currentInterested}
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl className={`${classes.formGroup} ${classes.shortInput}`}>
                        <FormLabel>Experience</FormLabel>
                        <SkillChips
                            classes={classes}
                            interests={this.state.experienced}
                            onDelete={this.onExperienceDelete}
                        />
                        <TextField
                            onKeyPress={this.onExperienceKeyPress}
                            onChange={this.handleChange}
                            name="currentExperienced"
                            value={this.state.currentExperienced}
                            variant="outlined"
                        />
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
