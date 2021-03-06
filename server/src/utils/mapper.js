import { ISO_DATE } from '../constants/expressions.js';

export const normalize = value => {
    switch (value) {
        case 'Y':
        case 'YES':
        case 'A':
            return true;
        case 'N':
        case 'NO':
            return false;
        default:
            return value;
    }
};

export const prepareValue = value => {
    if (ISO_DATE.test(value)) {
        return new Date(Date.parse(value));
    } else {
        return value;
    }
};

export const mapper = data =>
    Object.fromEntries(
        (Array.isArray(data) ? data : Object.entries(data)).map(([key, value]) => [
            key.toLowerCase().replace(/([-_][a-z])/g, group => group.toUpperCase().replace(/[-_]/g, '')),
            normalize(value),
        ])
    );
