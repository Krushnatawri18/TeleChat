// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx3BFZXmDHsbtZ4S_qJo6r-whKMWUUn1U",
  authDomain: "telechat-76b68.firebaseapp.com",
  projectId: "telechat-76b68",
  storageBucket: "telechat-76b68.appspot.com",
  messagingSenderId: "606195137097",
  appId: "1:606195137097:web:a1a56b7350d210cda19d98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);