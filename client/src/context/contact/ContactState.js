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
        ],
        //current contact object
        current: null,
        //array of filtered contacts
        filtered: null
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
    const deleteContact = id => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
    }
    //set current contact
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        });
    }
    //clear current contact
    const clearCurrent = () => {
        dispatch({
            type: SET_CURRENT,
            payload: null
        });
    }
    //update contact
    const updateContact = contact => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        });
    }
    //filter contacts
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    }
    //clear filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER,
        });
    }
    return (
        <ContactContext.Provider
            //add methods to be accessed by context
            value = {{
                contacts: state.contacts,
                current:state.current,
                filtered:state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;