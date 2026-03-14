import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Substitui com a tua configuração do Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCrHJrhyrWA8anrbtNRJEWj3gsGW2FcRnc",
  authDomain: "liga-ams2.firebaseapp.com",
  projectId: "liga-ams2",
  storageBucket: "liga-ams2.firebasestorage.app",
  messagingSenderId: "258877139013",
  appId: "1:258877139013:web:4f30777f5afe2cdfc31b2c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
