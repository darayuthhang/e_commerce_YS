import { ActionTypes } from "../constants/action-types";

const initalState = {
    profile:{
        name: "",
        email: "",
        password:""
    }
 
}

/*
@payload  object data contain, userName, email, and password.

*/
export const UserReducer = (state = initalState, {type, payload}) => {
    switch (type) {
        case ActionTypes.ADD_USER:
            return {
                ...state,
                profile:payload 
            };
            break;
    
        default:
            return state;
    }
}

