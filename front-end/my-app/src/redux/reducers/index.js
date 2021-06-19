import {combineReducers} from 'redux';
import { UserReducer} from './userReducers';
import { signInReducer } from './siginReducers';
const allReducers = combineReducers({
    UserReducer:UserReducer,
    signInReducer: signInReducer
})
export default allReducers;
