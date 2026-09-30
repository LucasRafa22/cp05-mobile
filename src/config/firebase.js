// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsCm88iUxYkSyIVvLOWJZtckyPfoWu590",
  authDomain: "cp05-mobile.firebaseapp.com",
  projectId: "cp05-mobile",
  storageBucket: "cp05-mobile.firebasestorage.app",
  messagingSenderId: "529560386949",
  appId: "1:529560386949:web:be2ab1428a12601e8d98ec",
  measurementId: "G-Q682278N3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Cloud Firestore
export const db = getFirestore(app);

export default app;