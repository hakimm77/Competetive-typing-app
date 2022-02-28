import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbxSrHAeUgSBggRNYDOiV7pl8IbTak3DU",
  authDomain: "typing-app-13a2a.firebaseapp.com",
  projectId: "typing-app-13a2a",
  storageBucket: "typing-app-13a2a.appspot.com",
  messagingSenderId: "410427316026",
  appId: "1:410427316026:web:f0796c7b3f3d4dadfde203",
  measurementId: "G-XV6HMSHZJ5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
