import React, {useContext, useEffect, useRef} from 'react'
import ContactContext from './contactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');

    const {filterContacts, clearFilter, filtered} = contactContext;

    useEffect(() => {
        if(filtered === null){
            //change input text to an empty string
            text.current.value = '';
        }
    });

    //update values on contact object
    const onChange = e => {
        if(text.current.value !== ''){
            filterContacts(e.target.value);
        }else{
            clearFilter();
        }
    }

    return (
        <form>
            <input ref = {text} type = "text" placeholder='Filter Contacts ...' onChange={onChange}/>
        </form>
    )
}

export default ContactFilter