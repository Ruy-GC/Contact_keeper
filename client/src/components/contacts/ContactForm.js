import React, {useContext, useState} from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    //add context to access methods 
    const contactContext = useContext(ContactContext);

    const[contact,setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const {name,email,phone,type} = contact;

    //update values on contact object
    const onChange = e => setContact({
        //copy current state
        ...contact,
        //asign the new value to the triggered state 
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        
        //send contact to context for upload
        contactContext.addContact(contact);

        //set contact state to default to reset the form
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'professional'
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>Add Contact</h2>
            <input
                type= 'text'
                placeholder='name'
                name = 'name'
                //pulled from state
                //if we are editing a contact the previous value apears
                value = {name}
                onChange = {onChange}
            />
            <input
                type= 'email'
                placeholder='Email'
                name = 'email'
                value = {email}
                onChange = {onChange}
            />
            <input
                type= 'text'
                placeholder='Phone'
                name = 'phone'
                value = {phone}
                onChange = {onChange}
            />
            <h5>Contact Type</h5>
            <input 
                type = "radio" 
                name = "type" 
                value = "personal" 
                checked = {type === "personal"} 
                onChange = {onChange}
            />{' '}Personal{' '}
            <input 
                type = "radio" 
                name = "type" 
                value = "professional" 
                checked = {type === "professional"} 
                onChange = {onChange}
            />{' '}Professional{' '}
            <div>
                <input type = "submit" value = "Add Contact" className = "btn btn-primary"/>
            </div>
        </form>
    )
}

export default ContactForm