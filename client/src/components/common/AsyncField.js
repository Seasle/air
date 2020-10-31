import React, { useState, useEffect } from 'react';
import { TextField, CircularProgress, withStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { debounce } from '../../utils';

const ThemedAutocomplete = withStyles(theme => ({
    inputRoot: {
        '&[class*="MuiOutlinedInput-root"]': {
            '$hasPopupIcon &, $hasClearIcon &': {
                paddingRight: 26 + 4 + 16,
            },
            '$hasPopupIcon$hasClearIcon &': {
                paddingRight: 52 + 4 + 16,
            },
            '& $endAdornment': {
                right: 16,
            },
        },
    },
    endAdornment: {},
}))(Autocomplete);

const AsyncField = ({ settings, label, name, variant, onChange, ...props }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const load = value => {
        setLoading(true);

        settings.endpoint(value).then(data => {
            if (open) {
                setOptions(data);
            }

            setLoading(false);
        });
    };

    const debouncedLoad = debounce(load, 500);

    useEffect(() => {
        if (open) {
            load();
        }

        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const handleChange = (event, value) => {
        onChange(name, value);

        if (settings.onChange !== undefined) {
            settings.onChange(value);
        }
    };

    const handleUpdate = event => {
        const value = event.target.value;

        debouncedLoad(value);
    };

    return (
        <ThemedAutocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options}
            loading={loading}
            onChange={handleChange}
            renderInput={params => {
                console.log(params);
                return (
                    <TextField
                        {...params}
                        label={label}
                        variant={variant}
                        onChange={handleUpdate}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                        {...props}
                    />
                );
            }}
        />
    );
};

export default AsyncField;
