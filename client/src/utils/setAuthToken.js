import axios from 'axios';

const setAuthToken = token =>{
    if(token){
        //backend header in which we send the token
        //sets a default config to use in every request
        /*this allows us to mantain the authorization 
        in all of our app without having to make a request for the token 
        each time we need it*/
        axios.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;