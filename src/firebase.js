import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDmh7ghzCT4TlGYoell2K5YNXBZIGMLSWA",
  authDomain: "red-and-black-party.firebaseapp.com",
  projectId: "red-and-black-party",
  storageBucket: "red-and-black-party.appspot.com",
  messagingSenderId: "174482990406",
  appId: "1:174482990406:web:636ffd06d8a6a30484f147"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()
