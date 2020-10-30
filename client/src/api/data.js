import { post } from './core';

const base = 'data';

export const getData = (params, options) => post(base, params, options);
