import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

export default (state,action) => {
    switch(action.type){
        case REGISTER_SUCCESS:
            //get auth token
            localStorage.setItem('token',action.payload.token);
            return {
                //all validation is done useing the auth middleware on the backend routes
                //in this reducer we just get the token and include it into state to be able to 
                // use our backend routes
                ...state,
                //token
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
            //clear token
            localStorage.removeItem('token');
            //reset state
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}