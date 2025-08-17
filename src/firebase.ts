// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNV_dKHFI2u5AaEx2cvZjrhL20M9vtLh8",
  authDomain: "storex-5257c.firebaseapp.com",
  projectId: "storex-5257c",
  storageBucket: "storex-5257c.firebasestorage.app",
  messagingSenderId: "847286650034",
  appId: "1:847286650034:web:4394663e30d171a75ab5ab",
  measurementId: "G-N53S1ZVKVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export { app, analytics };