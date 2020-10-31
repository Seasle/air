import { combineReducers } from 'redux';
import user from './userReducer';
import metaData from './metaDataReducer';
import common from './commonReducer';
import { RESET_STORE } from '../actionTypes';

const appReducer = combineReducers({
    user,
    metaData,
    common,
});

const rootReducer = (state, action) => {
    if (action.type === RESET_STORE) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
