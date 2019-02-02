import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from './auth/login-control';
import Register from './auth/register-control';
import Profile from './profile/profile-control';
import Home from './home/home-control';
import Playlists from "./playlists/playlists-control";
import Playlist from "./playlists/playlist-view";
import PlaylistInsert from "./playlists/playlist-insert";
import ProtectedRoute from './auth/protected-route';
import About from './about/about-control';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/about" component={About} />
                    <Route path="/profile/:username" component={Profile} />
                    <ProtectedRoute path="/playlists/:username" component={Playlists} />
                    <ProtectedRoute exact path="/playlist" component={PlaylistInsert} />
                    <ProtectedRoute exact path="/playlist/:id/edit" component={PlaylistInsert} />
                    <ProtectedRoute path="/playlist/:id" component={Playlist} />
                    <ProtectedRoute path="/home/:username" component={Home} />
                    <Redirect to={{ pathname: '/login' }} />
                </Switch>
            </Router>
        );
    }
}

export default App;
