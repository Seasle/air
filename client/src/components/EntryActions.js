import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import PassengerDialog from './dialogs/PassengerDialog';
import AirplaneDialog from './dialogs/AirplaneDialog';
import CityDialog from './dialogs/CityDialog';
import CountryDialog from './dialogs/CountryDialog';
import { PASSENGERS, FLIGHT, CITY, COUNTRY } from '../constants';

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
            {props.current === FLIGHT && permissions.insert && (
                <AirplaneDialog {...props}>
                    {openDialog => (
                        <ThemedButton color="primary" variant="contained" onClick={openDialog}>
                            Добавить
                        </ThemedButton>
                    )}
                </AirplaneDialog>
            )}
            {props.current === CITY && permissions.insert && (
                <CityDialog {...props}>
                    {openDialog => (
                        <ThemedButton color="primary" variant="contained" onClick={openDialog}>
                            Добавить
                        </ThemedButton>
                    )}
                </CityDialog>
            )}
            {props.current === COUNTRY && permissions.insert && (
                <CountryDialog {...props}>
                    {openDialog => (
                        <ThemedButton color="primary" variant="contained" onClick={openDialog}>
                            Добавить
                        </ThemedButton>
                    )}
                </CountryDialog>
            )}
        </>
    );
};

export default EntryActions;
