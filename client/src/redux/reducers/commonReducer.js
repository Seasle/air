import { CHANGE_MENU_TYPE } from '../actionTypes';

const initialState = {
    menuType: 'temporary',
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_MENU_TYPE:
            return {
                ...state,
                menuType: action.payload,
            };
        default:
            return state;
    }
};

export default commonReducer;
