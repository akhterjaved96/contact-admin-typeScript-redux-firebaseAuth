// main actions
import {createAsyncThunk} from "@reduxjs/toolkit";
import {SERVER_URLS} from "../../config/config";
import axios from "axios";
import {IContact} from "../../models/IContact";

// GET all contacts
export const fetchAllContacts = createAsyncThunk("fetchAllContacts", async ():Promise<any> => {
    let serverURL = `${SERVER_URLS.JSON_SERVER_URL}/contacts`;
    let response = await axios.get(serverURL);
    return response.data;
});

// Get a single contact
export const fetchContact = createAsyncThunk("fetchContact", async (contactId:string):Promise<any> => {
    let serverURL = `${SERVER_URLS.JSON_SERVER_URL}/contacts/${contactId}`;
    let response = await axios.get(serverURL);
    return response.data;
});

// Create a contact
export const createContact = createAsyncThunk("createContact", async (contact:IContact):Promise<any> => {
    let serverURL = `${SERVER_URLS.JSON_SERVER_URL}/contacts`;
    let response = await axios.post(serverURL, contact);
    return response.data;
});

// update a contact
export const updateContact = createAsyncThunk("updateContact", async (payload: {contact : IContact , contactId : string}):Promise<any> => {
    let {contact, contactId} = payload;
    let serverURL = `${SERVER_URLS.JSON_SERVER_URL}/contacts/${contactId}`;
    let response = await axios.put(serverURL, contact);
    return response.data;
});

// delete a contact
export const deleteContact = createAsyncThunk("deleteContact", async (contactId:string, {dispatch}):Promise<any> => {
    let serverURL = `${SERVER_URLS.JSON_SERVER_URL}/contacts/${contactId}`;
    let response = await axios.delete(serverURL);
    if (response) {
        dispatch(fetchAllContacts());
    }
    return response.data;
});

// get all groups
export const fetchAllGroups = createAsyncThunk("fetchAllGroups", async ():Promise<any> => {
    let serverURL = `${SERVER_URLS.JSON_SERVER_URL}/groups`;
    let response = await axios.get(serverURL);
    return response.data;
});

// get a group
export const fetchGroup = createAsyncThunk("fetchGroup", async (contactId:string):Promise<any> => {
    let contactResponse = await axios.get(`${SERVER_URLS.JSON_SERVER_URL}/contacts/${contactId}`);
    let groupResponse = await axios.get(`${SERVER_URLS.JSON_SERVER_URL}/groups/${contactResponse.data.groupId}`);
    return groupResponse.data;
});