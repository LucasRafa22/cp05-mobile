// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSPfSrlBJwB8fBzqDAyJ1IRW5sjcpVmRc",
  authDomain: "mobile-cp4-2d654.firebaseapp.com",
  projectId: "mobile-cp4-2d654",
  storageBucket: "mobile-cp4-2d654.firebasestorage.app",
  messagingSenderId: "616408978000",
  appId: "1:616408978000:web:a4eb495118e70b72f6f755",
  measurementId: "G-FW7TB4SZES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;