import { UPDATE_USER } from '../actionTypes';

export const updateUser = (payload = null) => ({
    type: UPDATE_USER,
    payload,
});
