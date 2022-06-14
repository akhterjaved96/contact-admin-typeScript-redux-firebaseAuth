import { initializeApp } from "firebase/app";
import {FacebookAuthProvider, getAuth, GoogleAuthProvider} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMOUIDWBZYl3lGhe9Ut2DNlzd-kGrg5LY",
    authDomain: "react-contact-app-71996.firebaseapp.com",
    databaseURL: "https://react-contact-app-71996-default-rtdb.firebaseio.com",
    projectId: "react-contact-app-71996",
    storageBucket: "react-contact-app-71996.appspot.com",
    messagingSenderId: "1025898427365",
    appId: "1:1025898427365:web:775e62e3cf276e40b1b50c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();
export default app;