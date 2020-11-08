import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import ThemedDialog from '../common/ThemedDialog';
import Field from '../common/Field';
import { FLIGHT, FLIGHT_NUMBER, AIRPLANE_ID, DEPARTURE_ID, ARRIVAL_ID, FIELDS } from '../../constants';
import { snakeToCamel, noop, px } from '../../utils';
import { execute, getAvailableFlights, getAvailableAirplanes, getAvailableCities } from '../../api';

const settings = {
    [FLIGHT_NUMBER]: () => ({
        async: true,
        endpoint: (start = '') => getAvailableFlights(new URLSearchParams({ start })),
        toOption: value => value,
        props: {
            freeSolo: true,
        },
    }),
    [AIRPLANE_ID]: () => ({
        async: true,
        endpoint: (start = '') => getAvailableAirplanes(new URLSearchParams({ start })),
        toOption: value => ({ name: value }),
        props: {
            getOptionLabel: option => option.name,
        },
    }),
    [DEPARTURE_ID]: () => ({
        async: true,
        endpoint: (start = '') => getAvailableCities(new URLSearchParams({ start })),
        toOption: value => ({ city: value }),
        props: {
            renderOption: option => (
                <>
                    <span>{option.country}</span>
                    {option.city}
                </>
            ),
            getOptionLabel: option => option.city,
        },
    }),
    [ARRIVAL_ID]: () => ({
        async: true,
        endpoint: (start = '') => getAvailableCities(new URLSearchParams({ start })),
        toOption: value => ({ city: value }),
        props: {
            renderOption: option => (
                <>
                    <span>{option.country}</span>
                    {option.city}
                </>
            ),
            getOptionLabel: option => option.city,
        },
    }),
};

const AirplaneDialog = ({ children, columns, data = {}, onChange = noop, ...props }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const existingPassenger = data.id !== undefined;

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
        const value = data[field] || '';
        const fieldSettings = fields[field].settings({});
        accumulator[field] = fieldSettings?.async && data.id !== undefined ? fieldSettings.toOption(value) : value;

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
                switch (column) {
                    case AIRPLANE_ID:
                        accumulator.values[column] = values[key].id;
                        break;
                    case DEPARTURE_ID:
                    case ARRIVAL_ID:
                        accumulator.values[column] = values[key].cityId;
                        break;
                    default:
                        accumulator.values[column] = values[key];
                        break;
                }

                return accumulator;
            },
            {
                columns: [],
                values: {},
            }
        );

        setSubmitting(true);

        execute({
            procedure: 'INSERT_FLIGHT',
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
                <DialogTitle>{!existingPassenger ? 'Создание рейса' : 'Изменение данных рейса'}</DialogTitle>
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
                                <pre>{JSON.stringify(values, null, 2)}</pre>
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
                                    {!existingPassenger ? 'Создать' : 'Изменить'}
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
    columns: state.metaData.columns[FLIGHT],
});

export default connect(mapStateToProps)(AirplaneDialog);
