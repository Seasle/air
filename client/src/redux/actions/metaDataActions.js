import { SET_ALLOWED } from '../actionTypes';

export const setAllowed = data => ({
    type: SET_ALLOWED,
    payload: data || [],
});
