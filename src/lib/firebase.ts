import { initializeApp } from 'firebase/app';
import { getFirestore } from  "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMQT6e4KTqva0D7rIWnSaBKICmG4QYWyY",
  authDomain: "qard-hassan.firebaseapp.com",
  projectId: "qard-hassan",
  storageBucket: "qard-hassan.firebasestorage.app",
  messagingSenderId: "1029950983841",
  appId: "1:1029950983841:web:064d016f5430e3b7142ae0",
  measurementId: "G-Z8KZSB3WDX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };