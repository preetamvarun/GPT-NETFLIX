// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth}  from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfjNgK6bu3kacIgHOXlmtrTPJdB5e-sSI",
  authDomain: "netflix-fafa7.firebaseapp.com",
  projectId: "netflix-fafa7",
  storageBucket: "netflix-fafa7.appspot.com",
  messagingSenderId: "116686517615",
  appId: "1:116686517615:web:013eacf70a5dc05b36a49a",
  measurementId: "G-413Q6RE9YJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();


/*
create a new project in firebase 
get this config file
Add authentication 

firebase login Error : 
running VS code as Administrator or just use another cmd, 
to open default cmd, just type cmd in powershell available in vs code, 
which is restricting from running script.

-- Steps to deploy your website using firebase
install firebase cli (see the command in firebase website)
firebase login 
firebase init (select hosting with no automatic builds)
firebase deploy



*/