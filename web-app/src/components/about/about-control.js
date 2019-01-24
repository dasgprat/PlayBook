import React from 'react';
import AboutView from './about-styles';
import { withRouter } from 'react-router-dom';

class AboutController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }

    componentDidMount() {
        
    }

    render() {
        return <AboutView/>;
    }
}

export default withRouter(AboutController);