import React, {Fragment,useContext} from 'react'
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext'

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const {contacts,filtered} = contactContext;

    if(contacts.length == 0){
        return <h4>Please Add a Contact</h4>
    }

    return (
        <Fragment>
            {filtered !== null 
                //if filtered has values display the filtered contact values
                ? filtered.map(contact => (
                    <ContactItem key = {contact.id} contact = {contact}/>
                    ))
                : contacts.map( contact => (
                    <ContactItem key = {contact.id} contact = {contact}/>
                    ))}
        </Fragment>
    )
}

export default Contacts