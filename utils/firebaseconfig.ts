// utils/firebaseconfig.ts
import Constants from 'expo-constants';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.APIKEY,
  authDomain: Constants.expoConfig?.extra?.AUTHDOMAIN,
  projectId: Constants.expoConfig?.extra?.PROJECTID,
  storageBucket: Constants.expoConfig?.extra?.STORAGEBUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.MESSAGINGSENDERID,
  appId: Constants.expoConfig?.extra?.APPID,
  measurementId: Constants.expoConfig?.extra?.MEASUREMENTID,
};

console.log('🔥 Firebase Config:', firebaseConfig);

export const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export const auth = getAuth(app);
// Initialize Firestore with long polling in React Native, or fallback if already initialized
let firestoreInstance;
try {
  firestoreInstance = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
} catch (initError: any) {
  console.warn('Firestore already initialized, using getFirestore()', initError);
  firestoreInstance = getFirestore(app);
}
export const firestore = firestoreInstance;
export const storage = getStorage(app);