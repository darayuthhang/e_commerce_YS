import {ActionTypes} from '../constants/action-types';

export const Sigin = (User) => {
    return {
        type:ActionTypes.SIGN_IN,
        payload: User
    }
}
