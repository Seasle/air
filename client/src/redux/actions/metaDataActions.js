import { SET_ALLOWED, SET_COLUMNS } from '../actionTypes';

export const setAllowed = data => ({
    type: SET_ALLOWED,
    payload: data || [],
});

export const setColumns = data => ({
    type: SET_COLUMNS,
    payload: data || [],
});
