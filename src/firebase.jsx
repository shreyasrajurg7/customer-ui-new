// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvjVm2mSCTeTZwQYnrDugMTQvd1kgeS20",
  authDomain: "vaulted-bivouac-311707.firebaseapp.com",
  projectId: "vaulted-bivouac-311707",
  storageBucket: "vaulted-bivouac-311707.appspot.com",
  messagingSenderId: "408677222834",
  appId: "1:408677222834:web:f1d3b6dedac3150011fcab",
  measurementId: "G-B80GQXL022"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);

export const passwordResetEmail =  sendPasswordResetEmail;