import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import ThemedDialog from '../common/ThemedDialog';
import Field from '../common/Field';
import { PASSENGERS, FLIGHT_NUMBER, FIELDS } from '../../constants';
import { getAvailableFlights } from '../../api/dictionary';
import { snakeToCamel, px } from '../../utils';

const settings = {
    [FLIGHT_NUMBER]: {
        async: true,
        endpoint: start =>
            getAvailableFlights(Boolean(start) ? new URLSearchParams({ start }) : undefined),
    },
};

const AddPassengerDialog = ({ children, columns, ...props }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const fields = columns.reduce((accumulator, entry) => {
        if (!entry.isIdentity) {
            accumulator[snakeToCamel(entry.columnName)] = {
                column: entry.columnName,
                type: entry.dataType,
                required: entry.required,
                settings: settings[entry.columnName] || null,
            };
        }

        return accumulator;
    }, {});

    const initialValues = Object.keys(fields).reduce((accumulator, field) => {
        accumulator[field] = '';

        return accumulator;
    }, {});

    const validate = values => {
        const errors = {};
        const keys = Object.keys(values);

        for (const key of keys) {
            if (fields[key].required && (values[key] === null || values[key] === '')) {
                errors[key] = 'Поле является обязательным';
            }
        }

        return errors;
    };

    return (
        <>
            {children(openDialog)}
            <ThemedDialog open={open} onClose={closeDialog}>
                <DialogTitle>Регистрация пассажира</DialogTitle>
                <Formik initialValues={initialValues} validate={validate}>
                    {({ values, touched, errors, handleChange, setFieldValue, handleSubmit }) => (
                        <>
                            <DialogContent className={classes.form}>
                                {Object.keys(fields).map((key, index) => (
                                    <Field
                                        settings={fields[key].settings}
                                        label={FIELDS.get(fields[key].column) || fields[key].column}
                                        type={fields[key].type}
                                        name={key}
                                        value={values[key]}
                                        helperText={touched[key] && errors[key]}
                                        required={fields[key].required}
                                        error={Boolean(touched[key] && errors[key])}
                                        onChange={handleChange}
                                        setFieldValue={setFieldValue}
                                        key={index}
                                    />
                                ))}
                                <pre>{JSON.stringify(values, null, 2)}</pre>
                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" onClick={closeDialog}>
                                    Отменить
                                </Button>
                                <Button color="primary" variant="contained" onClick={handleSubmit}>
                                    Зарегистрировать
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </Formik>
            </ThemedDialog>
        </>
    );
};

const useStyles = makeStyles(theme => ({
    form: {
        gap: px(16),
        display: 'grid',
        gridAutoRows: 'max-content',
    },
}));

const mapStateToProps = state => ({
    columns: state.metaData.columns[PASSENGERS],
});

export default connect(mapStateToProps)(AddPassengerDialog);
