import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import ThemedDialog from '../common/ThemedDialog';
import Field from '../common/Field';
import { PASSENGERS, FLIGHT_NUMBER, FIELDS, PLACE } from '../../constants';
import { getAvailableFlights, getAvailablePlaces } from '../../api/dictionary';
import { snakeToCamel, noop, px } from '../../utils';
import { insertData, updateData } from '../../api';

const settings = {
    [FLIGHT_NUMBER]: ({ setFieldValue = noop }) => ({
        async: true,
        endpoint: (start = '') => getAvailableFlights(new URLSearchParams({ start })),
        toOption: value => value,
        onChange: value => {
            setFieldValue(snakeToCamel(PLACE), '');
        },
    }),
    [PLACE]: ({ values = {} }) => {
        const value = values[snakeToCamel(FLIGHT_NUMBER)];

        return {
            async: true,
            endpoint: (start = '') =>
                getAvailablePlaces(new URLSearchParams({ flight: value, start: start.toUpperCase() })),
            toOption: value => ({ place: value }),
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

const PassengerDialog = ({ children, columns, data = {}, onChange = noop, ...props }) => {
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
        accumulator[field] = fieldSettings?.async ? fieldSettings.toOption(value) : value;

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

        (data.id === undefined ? insertData : updateData)({
            id: data.id ?? null,
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
                <DialogTitle>{!existingPassenger ? 'Регистрация пассажира' : 'Изменение данных пассажира'}</DialogTitle>
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
                                    {!existingPassenger ? 'Зарегистрировать' : 'Изменить'}
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
