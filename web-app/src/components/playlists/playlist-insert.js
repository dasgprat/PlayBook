import React from 'react';
import PropTypes from 'prop-types';
import AuthControl from '../auth/auth-control';
import {Redirect, withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import api from "../api-gateway";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => {
    return {
        loginRoot: {
            width: '100%',
            height: '100vh',
            backgroundColor: '#333333',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1
        },
        bgImage: {
            height: '100vh',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -1,
            opacity: '0.5'
        },
        errorMessage: {
            paddingTop: '5px'
        },
        main: {
            width: 'auto',
            display: 'block',
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
                width: 400,
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        },
        paper: {
            marginTop: theme.spacing.unit * 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${
            theme.spacing.unit * 2 // Fix IE 11 issue.
                }px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
        },
        avatar: { margin: theme.spacing.unit, backgroundColor: theme.palette.secondary.main },
        form: { width: '100%', marginTop: theme.spacing.unit },
        submit: { marginTop: theme.spacing.unit * 3 },
        register: { paddingTop: theme.spacing.unit * 2 }
    }; // Fix IE 11 issue.
};

class PlaylistForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: "",
            categories: [],
            description: "",
            links: [],
            redirectToReferrer: false
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onCategoriesChange = this.onCategoriesChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onLinksChange = this.onLinksChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onNameChange(event) {
        this.setState({ name: event.target.value });
    }

    onCategoriesChange(event) {
        this.setState({ categories: [event.target.value] });
    }

    onLinksChange(event) {
        this.setState({ links: [event.target.value] });
    }

    onDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    getPlaylist(id, callback) {
        console.log(`insert: /playlist/${id}`);
        api.get(`/playlist/${id}`, callback);
    }

    componentDidMount() {
        if (this.state.id) {
            this.getPlaylist(this.state.id, (err, res) => {
                if (err) {
                    console.log('Error in getPlaylist');
                    return this.setState({ playlist: null });
                }
                return this.setState({
                    name: res.name,
                    categories: res.categories.join(' '),
                    description: res.description,
                    links: res.links.join(' ')
                });
            });
        }
    }

    onFormSubmit(event) {
        event.stopPropagation();
        event.preventDefault();
        let playlist = {
            id:   this.state.id,
            name: this.state.name,
            author: AuthControl.user.username,
            categories: this.state.categories,
            description: this.state.description,
            links: this.state.links,
            personal: false,
            subscribedBy: []
        };
        let url = "/playlist";
        if (this.state.id) {
            url = `/playlist/${this.state.id}`;
        }
        api.post(url, playlist, (err, res) => {
            if (err) console.log(err);            
            console.log(JSON.stringify(res));
            this.setState({id: res.content.id, redirectToReferrer: true});
        });
    }

    render() {
        const { classes } = this.props;

        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            return <Redirect to={`/playlist/${this.state.id}`}/>;
        }

        return (
            <div className={classes.root}>
                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        <form className={classes.form} onSubmit={this.onFormSubmit}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onNameChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="categories">Categories</InputLabel>
                                <Input id="categories" name="categories"
                                       value={this.state.categories}
                                       onChange={this.onCategoriesChange} />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="description">Description</InputLabel>
                                <Input
                                    id="description"
                                    name="description"
                                    multiline
                                    value={this.state.description}
                                    onChange={this.onDescriptionChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="links">Links</InputLabel>
                                <Input id="links" name="links"
                                       value={this.state.links}
                                       onChange={this.onLinksChange} />
                            </FormControl>
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                Submit
                            </Button>
                        </form>
                    </Paper>
                </main>
            </div>
        );
    }
}

PlaylistForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(PlaylistForm));
