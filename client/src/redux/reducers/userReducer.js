import { UPDATE_USER } from '../actionTypes';

const initalState = {
    name: null,
    password: null,
};

const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                name: action.payload?.name || null,
                password: action.payload?.password || null,
            };
        default:
            return state;
    }
};

export default userReducer;
