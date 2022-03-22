import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated, logout, user} = authContext;

    const contactContext = useContext(ContactContext);
    const {clearContacts} = contactContext;

    const onLogout = () =>{
        logout();
        clearContacts();
    }
    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon}/> {title}
            </h1>
            <ul>
                {isAuthenticated ?        
                    <Fragment> 
                        <li>Hello {user && user.name}</li>
                        <li>
                            <a onClick={onLogout} href='#!'>
                                <i className='fas fa-sign-out-alt'/>{' '}
                                <span className='hide-sm'>Logout</span>
                            </a>
                        </li>
                    </Fragment>
                : 
                    <Fragment> 
                        <li>
                            <Link to = '/register'>Register</Link>
                        </li>
                        <li>
                            <Link to = '/login'>Login</Link>
                        </li>
                    </Fragment>
                }
            </ul>
        </div>
    )
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Contact keeper',
    icon: 'fas fa-id-card-alt'
}

export default Navbar