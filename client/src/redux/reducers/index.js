import { combineReducers } from 'redux';
import user from './userReducer';
import metaData from './metaDataReducer';

const rootReducer = combineReducers({
    user,
    metaData,
});

// const rootReducer = (state, action) => {
//     if (action.type === RESET_STORE) {
//         state = undefined;
//     }

//     return appReducer(state, action);
// };

export default rootReducer;
