
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyASrORtwM7pKNAfuJQAo9vHWfCVQgR8gzc",
  authDomain: "hackathon-app-adc9c.firebaseapp.com",
  projectId: "hackathon-app-adc9c",
  storageBucket: "hackathon-app-adc9c.appspot.com",
  messagingSenderId: "998034449062",
  appId: "1:998034449062:web:1ec39bb32fe2fdf4184a67",
  measurementId: "G-12PPSH0M59"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);       
export const db = getFirestore(app);     
export const storage = getStorage(app);  

export default firebaseConfig;           
