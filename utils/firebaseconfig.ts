// utils/firebaseconfig.ts
import Constants from 'expo-constants';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.APIKEY,
  authDomain: Constants.expoConfig?.extra?.AUTHDOMAIN,
  projectId: Constants.expoConfig?.extra?.PROJECTID,
  storageBucket: Constants.expoConfig?.extra?.STORAGEBUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.MESSAGINGSENDERID,
  appId: Constants.expoConfig?.extra?.APPID,
  measurementId: Constants.expoConfig?.extra?.MEASUREMENTID,
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// getAuth() sin initializeAuth → persistencia en memoria (no se guarda entre sesiones)
export const auth = getAuth(app);