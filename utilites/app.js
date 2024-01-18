// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  query,
  getDocs,
  deleteDoc,
  serverTimestamp,
  orderBy,
  where    
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytes
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHNnFmy-OPQakG33GUJBsmYSrv0ehQjfk",
  authDomain: "latest-social-media.firebaseapp.com",
  projectId: "latest-social-media",
  storageBucket: "latest-social-media.appspot.com",
  messagingSenderId: "930667751617",
  appId: "1:930667751617:web:7acc46b075586b0c17cc40"
};

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  db,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
  query,
  deleteDoc,
  ref,
  storage,
  getDownloadURL,
  uploadBytes,
  serverTimestamp,
  orderBy,
  where
    
};


