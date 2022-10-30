import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBziz8zin5yBWJ-I6Jd4fqRg4FsD0gMF4w",
  authDomain: "clever-thoughts-recorder.firebaseapp.com",
  projectId: "clever-thoughts-recorder",
  storageBucket: "clever-thoughts-recorder.appspot.com",
  messagingSenderId: "377610125388",
  appId: "1:377610125388:web:e49c0cd8c4faa3e576b4e9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
