import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS8vIK0hFAlQb3VLlnQ9UG46o1rSMNRcY",
  authDomain: "perfect-fx-academy.firebaseapp.com",
  projectId: "perfect-fx-academy",
  storageBucket: "perfect-fx-academy.firebasestorage.app",
  messagingSenderId: "127338263651",
  appId: "1:127338263651:web:742b4c0e9039cd8117f456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
