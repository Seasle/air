import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { ru } from 'date-fns/locale';

const DateField = ({ variant, label, name, value, onChange }) => {
    const [open, setOpen] = useState(false);

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
                onChange={value => onChange(name, value)}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                onAccept={() => setOpen(false)}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DateField;
