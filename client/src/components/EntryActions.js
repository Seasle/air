import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import AddPassengerDialog from './dialogs/AddPassengerDialog';

const ThemedButton = withStyles(theme => ({
    label: {
        textTransform: 'none',
    },
}))(Button);

const EntryActions = props => {
    return (
        <>
            <AddPassengerDialog>
                {openDialog => (
                    <ThemedButton color="primary" variant="contained" onClick={openDialog}>
                        Добавить
                    </ThemedButton>
                )}
            </AddPassengerDialog>
        </>
    );
};

export default EntryActions;
