import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7dqK2lKg9Tn4mwIhQ2WJF3tBD1exscJQ",
  authDomain: "projetocertificadora2.firebaseapp.com",
  databaseURL: "https://projetocertificadora2-default-rtdb.firebaseio.com",
  projectId: "projetocertificadora2",
  storageBucket: "projetocertificadora2.appspot.com",
  messagingSenderId: "229538512599",
  appId: "1:229538512599:web:99551cd240d0015b0eba92",
  measurementId: "G-SZZ216QW9G"
};

const app = initializeApp(firebaseConfig);


export const db = getDatabase(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);