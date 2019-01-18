import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './auth/login-control';
import Register from './auth/register-control';
import Home from './home/home-control';
import ProtectedRoute from './auth/protected-route';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <ProtectedRoute path="/home" component={Home} />
                    <Redirect to="/home" />
                </div>
            </Router>
        );
    }
}

export default App;
