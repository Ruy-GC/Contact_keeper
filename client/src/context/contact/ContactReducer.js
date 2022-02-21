import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

export default (state,action) => {
    switch(action.type){
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };
        case DELETE_CONTACT:
            return {
                ...state,
                //return all contacts that are not the current id
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
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
                    contact => contact.id === action.payload.id 
                    ? action.payload //updates contact
                    : contact// keeps same contact
                )}
        default:
            return state;
    }
}