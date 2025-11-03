// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDht7tlTscrYd9tSP3EpEnC8lqBPzTg6AI",
  authDomain: "fir-auth-smartdeals.firebaseapp.com",
  projectId: "fir-auth-smartdeals",
  storageBucket: "fir-auth-smartdeals.firebasestorage.app",
  messagingSenderId: "663723486665",
  appId: "1:663723486665:web:6fb9218cdcb7e53e4fcc18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
