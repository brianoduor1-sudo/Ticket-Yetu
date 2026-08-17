// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY6kwxU43tFpQTXIhgIJ2u9URObe6CLYY",
  authDomain: "ticket-yetu.firebaseapp.com",
  projectId: "ticket-yetu",
  storageBucket: "ticket-yetu.firebasestorage.app",
  messagingSenderId: "52016506416",
  appId: "1:52016506416:web:aef49603116480df88eff5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);