import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBp9fbTCcu5e6pGoDDRxfRYeQXn8iTgj7I",
  authDomain: "random-words-cb868.firebaseapp.com",
  projectId: "random-words-cb868",
  storageBucket: "random-words-cb868.appspot.com",
  messagingSenderId: "941841420051",
  appId: "1:941841420051:web:c2c0bf89fd9de6b820d4e6",
  measurementId: "G-6VENBC2SVY",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
