/**
 * @param {number} value
 * @returns {string}
 */
export const px = value => CSS.px(value).toString();

export const noop = () => {};

export const camelToSnake = value => (value || '').replace(/[A-Z]/g, '_$&').toUpperCase();

const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z?$/g;

export const parse = value => {
    if (ISO_DATE.test(value)) {
        return new Date(Date.parse(value)).toLocaleDateString('ru-RU');
    } else {
        return value;
    }
};
