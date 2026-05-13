import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3gyxvgS04vPWLunFtdKMwXk11IHBbFEY",
  authDomain: "sufimehendi-6a035.firebaseapp.com",
  projectId: "sufimehendi-6a035",
  storageBucket: "sufimehendi-6a035.firebasestorage.app",
  messagingSenderId: "580706355112",
  appId: "1:580706355112:web:fe1d272df29aaacc3fff9d",
  measurementId: "G-4RK8VMX062",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
