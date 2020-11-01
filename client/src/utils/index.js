import format from './format';

/**
 * @param {number} value
 * @returns {string}
 */
export const px = value => CSS.px(value).toString();

export const noop = () => {};

export const camelToSnake = value => (value || '').replace(/[A-Z]/g, '_$&').toUpperCase();

export const snakeToCamel = value =>
    (value || '')
        .toLowerCase()
        .replace(/([-_][a-z])/g, group => group.toUpperCase().replace(/[-_]/g, ''));

export const debounce = (handle, duration = 0) => {
    let timeout = null;

    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => handle.apply(this, args), duration);
    };
};

export const mergeMaps = (...entries) => new Map(entries.map(map => [...map.entries()]).flat());

const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z?$/g;

export const parse = (value, column) => {
    if (ISO_DATE.test(value)) {
        return new Date(Date.parse(value)).toLocaleDateString('ru-RU');
    } else if (column === 'flightTime') {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value - hours * 3600) / 60);
        const seconds = value - hours * 3600 - minutes * 60;

        return [
            hours > 0 ? `${hours} ч.` : null,
            minutes > 0 ? `${minutes} м.` : null,
            seconds > 0 ? `${seconds} с.` : null,
        ]
            .filter(entry => entry !== null)
            .join(' ');
    } else {
        return value;
    }
};

export const stringifyValue = value => {
    if (value instanceof Date) {
        return format(value, '[day]/[month]/[year]');
    } else {
        return value;
    }
};
