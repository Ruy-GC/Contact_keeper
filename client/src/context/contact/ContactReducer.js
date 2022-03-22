import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

export default (state,action) => {
    switch(action.type){
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [ action.payload,...state.contacts],
                loading: false
            };
        case DELETE_CONTACT:
            return {
                ...state,
                //return all contacts that are not the current id
                contacts: state.contacts.filter(
                    contact => contact._id !== action.payload
                ),
                loading: false,
            };
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                error: null,
                current: null,
            };
        case SET_CURRENT:
            return{
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(
                    //if the state contact id equals the edited contact id
                    contact => contact._id === action.payload._id 
                    ? action.payload //updates contact
                    : contact// keeps same contact
                ),
                loading: false
            };
        case FILTER_CONTACTS:
            return {
                ...state,
                // filter for every contact in state
                filtered: state.contacts.filter(contact => {
                    //gets text from payload and turns it into a regular expression
                    //this helps validate the string by checking if the pattern of characters 
                    //in the regular expression is in other strings
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}