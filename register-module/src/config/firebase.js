import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDJa0T_lBfY8R1o8ncqLp1o7bATL8XQzCE",
  authDomain: "auth-development-b0e2f.firebaseapp.com",
  projectId: "auth-development-b0e2f",
  storageBucket: "auth-development-b0e2f.appspot.com",
  messagingSenderId: "55816523976",
  appId: "1:55816523976:web:37e91a7c5ed5983e6915fd",
  measurementId: "G-BPS4643N63"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
