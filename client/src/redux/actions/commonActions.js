import { RESET_STORE, CHANGE_MENU_TYPE } from '../actionTypes';

export const resetStore = () => ({
    type: RESET_STORE,
});

export const changeMenuType = payload => ({
    type: CHANGE_MENU_TYPE,
    payload,
});
