import React , {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';

//context
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

//utils
import setAuthToken from './utils/setAuthToken';
import './App.css';

//set auth token for all the web app
if(localStorage.token){
    setAuthToken(localStorage.token); 
}

const App = () => {
    return (
        <AuthState>
            <ContactState>
                <AlertState>
                    <Router>
                        <Fragment>
                            <Navbar/>
                            <div className='container'>
                                <Alerts/>
                                <Routes>
                                    <Route exact path='/' element = {<Home/>}/>
                                    <Route exact path='/about' element = {<About/>}/>
                                    <Route exact path='/register' element = {<Register/>}/>
                                    <Route exact path='/login' element = {<Login/>}/>
                                </Routes>
                            </div>
                        </Fragment>
                    </Router>
                </AlertState>
            </ContactState>
        </AuthState>
    );
}

export default App;
