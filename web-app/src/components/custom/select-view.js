import React, { Component } from 'react';

import AsyncSelect from "react-select/lib/Async";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
    return {
        select: { marginTop: '50px' },
    }; // Fix IE 11 issue.
};

class SelectView extends Component {

    constructor(props) {
        super(props);

        this.state = { inputValue: "" };

        this.promiseOptions = this.promiseOptions.bind(this);
    }

    promiseOptions(input) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.props.dataOptions(input));
            }, 1000);
        });
    }

    render() {
        const { classes, defaultOptions, onOptionsChange } = this.props;

        return (
            <AsyncSelect isMulti cacheOptions
                         className={classes.select}
                         defaultOptions={defaultOptions}
                         loadOptions={this.promiseOptions}
                         onChange={onOptionsChange} />
        );
    }
}

SelectView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectView);
