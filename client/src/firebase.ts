// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";        // Added for Login
import { getFirestore } from "firebase/firestore"; // Added for Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmpB0-UanYIi-4-kozScSHCQnLiulkqDQ",
  authDomain: "assumptiondb.firebaseapp.com",
  projectId: "assumptiondb",
  storageBucket: "assumptiondb.firebasestorage.app",
  messagingSenderId: "705962102642",
  appId: "1:705962102642:web:23a79bb2d3010c332e97eb",
  measurementId: "G-V7N4XJQWS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the tools your app needs
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;