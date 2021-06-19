import { ActionTypes } from "../constants/action-types";
const siginState  = {
    profile:{
        sigin_in: false
    }
}

export const signInReducer = (state = siginState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SIGN_IN:
            return {
                ...state,
                profile:payload 
            };
            break;
        default:
            return state;
    }
}

