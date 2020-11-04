import React from 'react';
import PassengerDialog from './PassengerDialog';
import CountryDialog from './CountryDialog';
import { PASSENGERS, COUNTRY } from '../../constants';

const EditDialog = ({ children, ...props }) => {
    if (props.current === PASSENGERS) {
        return <PassengerDialog {...props}>{openDialog => children(openDialog)}</PassengerDialog>;
    }

    if (props.current === COUNTRY) {
        return <CountryDialog {...props}>{openDialog => children(openDialog)}</CountryDialog>;
    }

    return null;
};

export default EditDialog;
