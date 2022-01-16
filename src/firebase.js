import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDmh7ghzCT4TlGYoell2K5YNXBZIGMLSWA",
  authDomain: "red-and-black-party.firebaseapp.com",
  databaseURL: "https://red-and-black-party-default-rtdb.firebaseio.com",
  projectId: "red-and-black-party",
  storageBucket: "red-and-black-party.appspot.com",
  messagingSenderId: "174482990406",
  appId: "1:174482990406:web:636ffd06d8a6a30484f147"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)


export {
  db,
  auth,
  storage
}