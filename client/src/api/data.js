import { post } from './core';

const base = 'data';

export const getData = (params, options) => post(base, params, options);

export const insertData = (params, options) => post(`${base}/insert`, params, options);

export const updateData = (params, options) => post(`${base}/update`, params, options);

export const deleteData = (params, options) => post(`${base}/delete`, params, options);

export const execute = (params, options) => post(`${base}/execute`, params, options);
