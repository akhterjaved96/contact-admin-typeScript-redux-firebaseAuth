import {combineReducers} from "@reduxjs/toolkit";
import * as contactReducer from './contacts/contacts.feature';
import * as authReducer from './auth/auth.feature';

const rootReducer = combineReducers({
    [contactReducer.CONTACTS_FEATURE] : contactReducer.contactsSlice.reducer,
    [authReducer.AUTH_FEATURE] : authReducer.authSlice.reducer
});
export default rootReducer;