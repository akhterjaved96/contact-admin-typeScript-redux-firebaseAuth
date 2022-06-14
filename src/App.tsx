import React, {useEffect} from 'react';
import './App.css';
import MainNavbar from "./modules/layout/navbar/MainNavbar";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from "./modules/layout/home/Home";
import Dashboard from "./modules/dashboard/Dashboard";
import ContactsAdmin from './modules/contacts/admin/ContactsAdmin'
import About from "./modules/layout/about/About";
import AddContact from "./modules/contacts/add-contact/AddContact";
import ViewContact from "./modules/contacts/view-contact/ViewContact";
import EditContact from "./modules/contacts/edit-contact/EditContact";
import PageNotFound from "./modules/util/not-found/PageNotFound";
import Register from "./modules/auth/Register";
import {auth} from "./firebase/firebaseConfig";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "./store/auth/auth.feature";
import {AppDispatch} from "./store/store";
import * as authReducer from "./store/auth/auth.feature";

interface Props{}
interface State{}

let App:React.FC<Props> = ({}) => {
  const dispatch:AppDispatch = useDispatch();

  // get the state information from store
  let authState = useSelector((store:{authFeature:authReducer.InitialState}) => {
    return store.authFeature;
  })

  let {loading , errorMessage, currentUser} = authState;

  useEffect(() => {
    auth.onAuthStateChanged((userInfo) => {
       if(userInfo){
         dispatch(setUser(userInfo));
       }
       else{
         dispatch(setUser(null));
       }
    });
  }, [currentUser])

  return (
    <div className="App">
      <BrowserRouter>
        <MainNavbar title={"Contacts Admin"}/>
        <Routes>
          <Route  path={'/'} element={<Home/>}/>
          <Route  path={'/dashboard'} element={currentUser ? <Dashboard/> : <Navigate to={'/'}/>}/>
          <Route  path={'/auth/register'} element={<Register/>}/>
          <Route  path={'/contacts/admin'} element={currentUser ? <ContactsAdmin/> : <Navigate to={'/'}/>}/>
          <Route  path={'/contacts/add'} element={currentUser ? <AddContact/> : <Navigate to={'/'}/>}/>
          <Route  path={'/contacts/view/:contactId'} element={currentUser ? <ViewContact/> : <Navigate to={'/'}/>}/>
          <Route  path={'/contacts/edit/:contactId'} element={currentUser ? <EditContact/> : <Navigate to={'/'}/>}/>
          <Route  path={'/about'} element={<About/>}/>
          <Route  path={'*'} element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;