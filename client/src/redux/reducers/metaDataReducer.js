import { SET_ALLOWED } from '../actionTypes';

const initalState = {
    allowed: [],
};

const metaDataReducer = (state = initalState, action) => {
    switch (action.type) {
        case SET_ALLOWED:
            return {
                ...state,
                allowed: action.payload,
            };
        default: {
            return state;
        }
    }
};

export default metaDataReducer;
