import React from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import styles from './profile-styles';

class ProfileView extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <div></div>
    }
}

ProfileView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileView);