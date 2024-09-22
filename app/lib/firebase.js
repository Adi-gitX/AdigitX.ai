// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyBILLDgM0HoYxmpZjgbRxzkp_Yokl8aUTs",
  authDomain: "annonimusdev.firebaseapp.com",
  projectId: "annonimusdev",
  storageBucket: "annonimusdev.appspot.com",
  messagingSenderId: "170829561426",
  appId: "1:170829561426:web:d870e95f39e81fb31d698b",
  measurementId: "G-7Q1NJR67VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
