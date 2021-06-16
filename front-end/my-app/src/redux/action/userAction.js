import {ActionTypes} from '../constants/action-types';

export const addUser = (User) => {
    return {
        type:ActionTypes.ADD_USER,
        payload: User
    }
}
