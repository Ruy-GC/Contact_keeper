import React, {useReducer} from "react";
import axios from 'axios';
import ContactContext from "./contactContext";
import contactReducer from "./ContactReducer";

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [],
        //current contact object
        current: null,
        //array of filtered contacts
        filtered: null,
        error: null
    };

    const [state,dispatch] = useReducer(contactReducer, initialState);

    //ad contact
    const addContact = async contact => {
        //temporal id for testing
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts',contact,config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            });
        }
        
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
            type: CLEAR_CURRENT,
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
                error:state.error,
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