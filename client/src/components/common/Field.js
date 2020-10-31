import React from 'react';
import { TextField } from '@material-ui/core';
import DateField from './DateField';

const Field = ({ type, label, name, value, onChange, setFieldValue, ...props }) => {
    switch (type) {
        case 'DATE':
            return (
                <DateField
                    variant="outlined"
                    label={label}
                    name={name}
                    value={value}
                    onChange={setFieldValue}
                />
            );
        default:
            return (
                <TextField
                    variant="outlined"
                    type="text"
                    label={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                    {...props}
                />
            );
    }
};

export default Field;
