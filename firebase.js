// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABDzOjCMgiRe-s2ScXD1qlC_ZaYeKu428",
  authDomain: "todo-list-ce942.firebaseapp.com",
  databaseURL: "https://todo-list-ce942-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-list-ce942",
  storageBucket: "todo-list-ce942.firebasestorage.app",
  messagingSenderId: "417090112488",
  appId: "1:417090112488:web:9127859107a14eecfef25d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);