import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import ThemedDialog from '../common/ThemedDialog';
import Field from '../common/Field';
import { PASSENGERS, FLIGHT_NUMBER, FIELDS, PLACE } from '../../constants';
import { getAvailableFlights, getAvailablePlaces } from '../../api/dictionary';
import { snakeToCamel, noop, px } from '../../utils';
import { insertData } from '../../api';

const settings = {
    [FLIGHT_NUMBER]: ({ setFieldValue }) => ({
        async: true,
        endpoint: (start = '') => getAvailableFlights(new URLSearchParams({ start })),
        onChange: value => {
            setFieldValue(snakeToCamel(PLACE), '');
        },
    }),
    [PLACE]: ({ values }) => {
        const value = values[snakeToCamel(FLIGHT_NUMBER)];

        return {
            async: true,
            endpoint: (start = '') =>
                getAvailablePlaces(new URLSearchParams({ flight: value, start: start.toUpperCase() })),
            props: {
                renderOption: option => (
                    <>
                        <span>{option.placeType}</span>
                        {option.place}
                    </>
                ),
                getOptionLabel: option => option.place,
                disabled: values === null || value === '',
            },
        };
    },
};

const PassengerDialog = ({ children, columns, onChange = noop, ...props }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const fields = columns.reduce((accumulator, entry) => {
        if (!entry.isIdentity) {
            accumulator[snakeToCamel(entry.columnName)] = {
                column: entry.columnName,
                type: entry.dataType,
                required: entry.required,
                settings: settings[entry.columnName] || (() => ({})),
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

    const handleSubmit = values => {
        const combined = Object.keys(fields).reduce(
            (accumulator, key) => {
                const column = fields[key].column;

                accumulator.columns.push(column);
                accumulator.values[column] = column === PLACE ? values[key].place : values[key];

                return accumulator;
            },
            {
                columns: [],
                values: {},
            }
        );

        setSubmitting(true);

        insertData({
            table: PASSENGERS,
            ...combined,
        }).then(() => {
            setSubmitting(false);
            setOpen(false);

            onChange();
        });
    };

    return (
        <>
            {children(openDialog)}
            <ThemedDialog open={open} onClose={closeDialog}>
                <DialogTitle>Регистрация пассажира</DialogTitle>
                <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
                    {({ values, touched, errors, handleChange, setFieldValue, handleSubmit }) => (
                        <>
                            <DialogContent className={classes.form}>
                                {Object.keys(fields).map((key, index) => (
                                    <Field
                                        settings={fields[key].settings({
                                            values,
                                            setFieldValue,
                                        })}
                                        label={FIELDS.get(fields[key].column) || fields[key].column}
                                        type={fields[key].type}
                                        name={key}
                                        value={values[key]}
                                        helperText={touched[key] && errors[key]}
                                        required={fields[key].required}
                                        error={Boolean(touched[key] && errors[key])}
                                        autoComplete="off"
                                        onChange={handleChange}
                                        setFieldValue={setFieldValue}
                                        key={index}
                                    />
                                ))}
                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" onClick={closeDialog} disabled={submitting}>
                                    Отменить
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    disabled={submitting}
                                    onClick={handleSubmit}
                                >
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

export default connect(mapStateToProps)(PassengerDialog);
