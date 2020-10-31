import { get } from './core';

const base = 'meta';

export const getAllowed = () => get(`${base}/allowed`);

export const getColumns = () => get(`${base}/columns`);
