import React, { useContext } from 'react'
import {Navigate , Outlet} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

//gets component to render
const PrivateRoute = ({Component}) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated} = authContext;

    return isAuthenticated ?  <Component/> : <Navigate to = '/login'/>
}

export default PrivateRoute;