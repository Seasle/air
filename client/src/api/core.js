import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * @param {string} url
 * @param {object} options
 */
export const get = (url, options = {}) => instance.get(url, options).then(response => response.data);

/**
 * @param {string} url
 * @param {any} data
 * @param {object} options
 */
export const post = (url, data, options = {}) => instance.post(url, data, options).then(response => response.data);
