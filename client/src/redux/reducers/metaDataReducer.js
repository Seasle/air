import { SET_ALLOWED, SET_COLUMNS } from '../actionTypes';

const initalState = {
    allowed: [],
    columns: {},
};

const metaDataReducer = (state = initalState, action) => {
    switch (action.type) {
        case SET_ALLOWED:
            return {
                ...state,
                allowed: action.payload,
            };
        case SET_COLUMNS: {
            return {
                ...state,
                columns: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default metaDataReducer;
