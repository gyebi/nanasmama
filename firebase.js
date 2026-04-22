import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDbNhN10wjwCupwvH2hkmxhGd3SXQRdJKE",
  authDomain: "nanaamama.firebaseapp.com",
  projectId: "nanaamama",
  storageBucket: "nanaamama.firebasestorage.app",
  messagingSenderId: "418491897806",
  appId: "1:418491897806:web:b28572c85c3df9c057bd9f"
};

export const app = initializeApp(firebaseConfig);

