import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";
import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, signInWithPopup} from 'firebase/auth';
import {auth, facebookAuthProvider, googleAuthProvider} from "../../firebase/firebaseConfig";

// Register a User
export const registerUser = createAsyncThunk("registerUser", async (user:IUser):Promise<any> => {
    let {email ,password, username} = user;
    let response = await createUserWithEmailAndPassword(auth,email,password).then((result) => {
        updateProfile(result.user, {displayName : username})
    })
    return response;
});

// Login a User
export const loginUser = createAsyncThunk("loginUser", async (user:IUser):Promise<any> => {
    let {email ,password} = user;
    let response = await signInWithEmailAndPassword(auth,email,password);
    return response;
});

// LogOut User
export const logOutUser = createAsyncThunk("logOutUser", async ():Promise<any> => {
    let response = await signOut(auth);
    return response;
});


// Google Login
export const googleLogin = createAsyncThunk("googleLogin", async ():Promise<any> => {
    let response = await signInWithPopup(auth, googleAuthProvider);
    return response;
});

// Facebook Login
export const facebookLogin = createAsyncThunk("facebookLogin", async ():Promise<any> => {
    let response = await signInWithPopup(auth, facebookAuthProvider);
    return response;
});