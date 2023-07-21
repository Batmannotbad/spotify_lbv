import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZjhRz-GS0e1C-0U4cy_kDKXE6rwhltjA",
  authDomain: "lam-mai-khong-xong.firebaseapp.com",
  projectId: "lam-mai-khong-xong",
  storageBucket: "gs://lam-mai-khong-xong.appspot.com",
  messagingSenderId: "546499374566",
  appId: "1:546499374566:web:233ae227b1835bbe90ba27",
  measurementId: "G-SMVSZEERHZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
