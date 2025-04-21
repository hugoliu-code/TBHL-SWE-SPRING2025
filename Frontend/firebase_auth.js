// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhf7eLZgJlzDW_BEd7HcIcNZF7_NMwRJk",
  authDomain: "tbhl-swe-2025.firebaseapp.com",
  projectId: "tbhl-swe-2025",
  storageBucket: "tbhl-swe-2025.firebasestorage.app",
  messagingSenderId: "964542488839",
  appId: "1:964542488839:web:5da408dd6a73381d2f25a2",
  measurementId: "G-9WQRX779V4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
