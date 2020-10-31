import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ru } from 'date-fns/locale';

const DateField = ({ variant, label, name, value, onChange, ...props }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const normalizedProps = Object.keys(props).reduce((accumulator, key) => {
        if (Boolean(props[key])) {
            accumulator[key] = props[key];
        }

        return accumulator;
    }, {});

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
            <KeyboardDatePicker
                disableToolbar
                open={open}
                variant="inline"
                inputVariant={variant}
                format="dd/MM/yyyy"
                label={label}
                value={value || null}
                invalidDateMessage="Введенная дата является не корректной"
                minDateMessage="Введенная дата не может быть меньше минимальной"
                maxDateMessage="Введенная дата не может быть больше максимальной"
                KeyboardButtonProps={{
                    size: 'small',
                    className: classes.button,
                }}
                onChange={value => onChange(name, value)}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                onAccept={() => setOpen(false)}
                {...normalizedProps}
            />
        </MuiPickersUtilsProvider>
    );
};

const useStyles = makeStyles(theme => ({
    button: {
        padding: 2,
    },
}));

export default DateField;
