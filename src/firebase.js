import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDMMcv4MJsCZ7fwzOUGLLavE4nvCnMsp7g",
  authDomain: "red-black-party.firebaseapp.com",
  projectId: "red-black-party",
  storageBucket: "red-black-party.appspot.com",
  messagingSenderId: "619645907586",
  appId: "1:619645907586:web:5511b9b5ca3e3ae8b57a9b",
  measurementId: "G-42BBFP95NX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()
