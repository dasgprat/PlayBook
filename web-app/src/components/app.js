import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './auth/login-control';
import Register from './auth/register-control';
import Home from './home/home-control';
import ProtectedRoute from './auth/protected-route';
import About from './about/about-control';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/about" component={About} />
                    <ProtectedRoute path="/home" component={Home} />
                </div>
            </Router>
        );
    }
}

export default App;
