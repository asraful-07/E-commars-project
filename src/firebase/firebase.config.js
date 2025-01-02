// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDfwX0UQuVDU9Qxv0sVtz-gsDqUXH6ycQ",
  authDomain: "new-auth-6bbe2.firebaseapp.com",
  projectId: "new-auth-6bbe2",
  storageBucket: "new-auth-6bbe2.firebasestorage.app",
  messagingSenderId: "556987590639",
  appId: "1:556987590639:web:083b21796aaef973dc781a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;
