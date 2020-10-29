import { get } from './core';

const base = 'meta';

export const getAllowed = () => get(`${base}/allowed`);
