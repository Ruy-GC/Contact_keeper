import React, {useContext, useState, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    //add context to access methods 
    const contactContext = useContext(ContactContext);

    const {addContact, current, clearCurrent,updateContact} = contactContext;

    //mimics component did mount, if current has value changes form to current data
    useEffect(()=> {
        if(current !== null){
            setContact(current);
        }else{
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    //add dependencias, this makes that the hook is only used when context is needed
    },[contactContext]);

    //useState hook
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

        //if there is no current contact create a new one, 
        if(current === null){
            //send contact to context for upload
            addContact(contact);
        
        //else update current contact
        }else{
            updateContact(contact);
        }

        //set contact state to default to reset the form
        clearAll();
    }

    //clear form
    const clearAll = () =>{
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
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
                <input type = "submit" value = {current ? 'Update Contact' : 'Add Contact'} className = "btn btn-primary btn-block"/>
            </div>
            {current && <div>
                <button className = "btn btn-light btn-block" onClick={clearAll}>Clear</button>    
            </div>}
        </form>
    )
}

export default ContactForm