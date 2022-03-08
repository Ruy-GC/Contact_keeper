import React, {Fragment,useContext} from 'react'
import {CSSTransition , TransitionGroup} from 'react-transition-group'
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
            <TransitionGroup>
                {filtered !== null 
                    //if filtered has values display the filtered contact values
                    ? filtered.map(contact => (
                        <CSSTransition key={contact._id} timeout = {500} classNames = "item">
                            <ContactItem key = {contact._id} contact = {contact}/>
                        </CSSTransition>
                        ))
                    : contacts.map( contact => (
                        <CSSTransition key={contact._id} timeout = {500} classNames = "item">
                            <ContactItem key = {contact._id} contact = {contact}/>
                        </CSSTransition>
                        ))}
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts