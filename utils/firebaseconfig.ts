// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.APIKEY,
  authDomain: ,
  projectId: ,
  storageBucket: ,
  messagingSenderId:,
  appId: ,
  measurementId: 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);