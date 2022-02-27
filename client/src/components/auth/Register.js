import React, {useState,useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { useNavigate  } from "react-router-dom"

const Register = props => {
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    const authContext = useContext(AuthContext);
    const {register,error,clearErrors,isAuthenticated} = authContext;

    //allow to naviigate through the routes
    const navigate = useNavigate ();

    useEffect(()=> {
        if(isAuthenticated){
            //redirects to the homepage
            navigate('/');
        }

        if(error === 'User already exists'){
            setAlert(error,'danger');
            clearErrors();
        }
        
        // eslint-disable-next-line
    },[error,isAuthenticated,props.history]);

    //user register fields
    const [user,setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name,email,password,password2} = user;

    //copies user data and changes the target of the onchange
    const onChange = e => setUser({...user, [e.target.name]:e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === ''){
            setAlert('Please enter all fields','danger');
        }else if (password !== password2){
            setAlert('Passwords do not match','danger');
        }else{
            //use register function from authCOntext
            register({
                //formData used in AuthState.js
                name,
                email,
                password
            })
        }
    }
    
    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-promary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name = 'name' value={name} onChange = {onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' name = 'email' value={email} onChange = {onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name = 'password' value={password} onChange = {onChange} required minLength={6}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input type='password' name = 'password2' value={password2} onChange = {onChange} required minLength={6}/>
                </div>
                <input type="submit" value = "Register" className='btn btn-primary btn-block'/>
            </form>
        </div>
    )
}

export default Register;