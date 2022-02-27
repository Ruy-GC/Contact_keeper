import React, {useReducer} from "react";
import axios from 'axios';
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

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

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state,dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async() => {

        //set auth token for all the web app
        if(localStorage.token){
           setAuthToken(localStorage.token); 
        }
        
        try {
            const res = await axios.get('/api/auth');

            //res.data is the user data we need to load 
            dispatch({type: USER_LOADED, payload: res.data})
        } catch (error) {
            dispatch({type:AUTH_ERROR})
        }
    }

    // Register User
    const register = async formData => {
        //axios request is going to return an application/json
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            //calls the backend post request of the users api
            //form data gets the value from the register form
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                //msg from the error json generated in the user route
                payload: error.response.data.msg
            });
        }
    }

    // Login User
    const login = () => {
        
    }
    //Logout
    const logout = () => {
        
    }
    //Clear Errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }
    return (
        <AuthContext.Provider
            //add methods to be accessed by context
            value = {{
                token: state.token,
                isAuthenticated:state.isAuthenticated,
                loading:state.loading,
                user: state.user,
                error:state.error,
                loadUser,
                register,
                login,
                logout,
                clearErrors

            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;