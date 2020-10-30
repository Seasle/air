import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, withStyles } from '@material-ui/core';
import { noop } from '../utils';

const ThemedButton = withStyles(theme => ({
    root: {
        justifyContent: 'flex-start',
    },
    label: {
        textAlign: 'left',
        textTransform: 'none',
    },
}))(Button);

const RouteButton = ({ children, to, back = false, onClick = noop, ...props }) => {
    const history = useHistory();

    const handleClick = event => {
        if (back) {
            history.goBack();
        } else {
            history.push(to);
        }

        onClick(event);
    };

    return (
        <ThemedButton {...props} onClick={handleClick}>
            {children}
        </ThemedButton>
    );
};

export default RouteButton;
