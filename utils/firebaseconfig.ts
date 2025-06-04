import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.APIKEY,
  authDomain: Constants.expoConfig?.extra?.AUTHDOMAIN,
  projectId: Constants.expoConfig?.extra?.PROJECTID,
  storageBucket: Constants.expoConfig?.extra?.STORAGEBUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.MESSAGINGSENDERID,
  appId: Constants.expoConfig?.extra?.APPID,
  measurementId: Constants.expoConfig?.extra?.MEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
