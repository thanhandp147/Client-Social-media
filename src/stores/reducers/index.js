import {combineReducers} from 'redux';

import userReducer from './user';
import postReducer from './post';
import onlineUserReducer from './onlineUser';


export default combineReducers({
    user: userReducer,
    post: postReducer,
    onlineUser: onlineUserReducer 
});