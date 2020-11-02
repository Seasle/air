import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import PassengerDialog from './dialogs/PassengerDialog';
import { PASSENGERS } from '../constants';

const ThemedButton = withStyles(theme => ({
    label: {
        textTransform: 'none',
    },
}))(Button);

const EntryActions = ({ permissions = {}, ...props }) => {
    return (
        <>
            {props.current === PASSENGERS && permissions.insert && (
                <PassengerDialog {...props}>
                    {openDialog => (
                        <ThemedButton color="primary" variant="contained" onClick={openDialog}>
                            Добавить
                        </ThemedButton>
                    )}
                </PassengerDialog>
            )}
        </>
    );
};

export default EntryActions;
