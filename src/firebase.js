// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfzYoJGXzqu_-puzAXQv9u6bjRpZ1CMEQ",
  authDomain: "todo-firebase-2d415.firebaseapp.com",
  projectId: "todo-firebase-2d415",
  storageBucket: "todo-firebase-2d415.appspot.com",
  messagingSenderId: "257114382583",
  appId: "1:257114382583:web:46e6d27e424360859df3f2",
  measurementId: "G-2VE55K9052"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
