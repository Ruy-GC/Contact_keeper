import React, {useReducer} from "react";
import {v4 as uuid} from 'uuid'
import ContactContext from "./contactContext";
import contactReducer from "./ContactReducer";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Pepe',
                email: 'pepe@gmail.com',
                phone: '111-111-111',
                type: 'professional'
            },
            {
                id: 2,
                name: 'Juan',
                email: 'juan@gmail.com',
                phone: '222-222-222',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Carlos',
                email: 'carlos@gmail.com',
                phone: '333-333-333',
                type: 'professional'
            },
        ]
    };

    const [state,dispatch] = useReducer(contactReducer, initialState);

    //ad contact
    const addContact = contact => {
        //temporal id for testing
        contact.id = uuid;
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        });
    }
    //delete contact

    //set current contact

    //clear current contact

    //update contact

    //filter contacts

    //clear filter

    return (
        <ContactContext.Provider
            value = {{
                contacts: state.contacts,
                addContact
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;