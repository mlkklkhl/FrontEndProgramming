import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASfRacYOGrY9myXzzqF2XQ_6-ACfc2SXw",
    authDomain: "reactjs-44dca.firebaseapp.com",
    databaseURL: "https://reactjs-44dca-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "reactjs-44dca",
    storageBucket: "reactjs-44dca.appspot.com",
    messagingSenderId: "665154509199",
    appId: "1:665154509199:web:d4ef56105ba5798c8113fa"
  };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);