import React, {Fragment,useContext,useEffect} from 'react'
import {CSSTransition , TransitionGroup} from 'react-transition-group'
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext'
import Spinner from '../layout/Spinner';
const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const {contacts,filtered,getContacts,loading} = contactContext;

    useEffect(() => {
        getContacts();
        //esliont-diable-next-line
    },[]);

    if(contacts == null && !loading){
        return <h4>Please Add a Contact</h4>
    }

    return (
        <Fragment>
            {contacts !== null && !loading ? (
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
                        ))
                    }
                </TransitionGroup>
            ) : <Spinner/>}
            
        </Fragment>
    )
}

export default Contacts