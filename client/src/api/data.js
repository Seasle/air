import { get } from './core';

const base = 'data';

export const getData = (name, options) => get(`${base}/${name}`, options);
