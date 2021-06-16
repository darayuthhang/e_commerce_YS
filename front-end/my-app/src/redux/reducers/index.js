import {combineReducers} from 'redux';
import { UserReducer } from './userReducers';
const allReducers = combineReducers({
    UserReducer:UserReducer
})
export default allReducers;
