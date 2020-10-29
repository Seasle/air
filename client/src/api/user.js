import { get, post } from './core';

const base = 'user';

export const getUser = () => get(`${base}`);

export const selectUser = data => post(`${base}`, data);

export const logoutUser = () => get(`${base}/logout`);
