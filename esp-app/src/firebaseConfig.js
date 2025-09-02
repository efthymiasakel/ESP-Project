import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFC7xrGPdV_x6fYCDBFlhrzsqc7ZdxYjE",
  authDomain: "esp-platform-eaa08.firebaseapp.com",
  projectId: "esp-platform-eaa08",
  storageBucket: "esp-platform-eaa08.firebasestorage.app",
  messagingSenderId: "558739546706",
  appId: "1:558739546706:web:6e4c5cd3da26ec1b7eb58b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const auth = getAuth(app);
export const db = getFirestore(app);
