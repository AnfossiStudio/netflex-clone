// Import the functions you need from the SDKs you need
import { initializeApp , getApp , getApps} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEtyWJpei82mnRtE50ZbIv6Fd8SJsChAA",
  authDomain: "netfilx-clone-cbec5.firebaseapp.com",
  projectId: "netfilx-clone-cbec5",
  storageBucket: "netfilx-clone-cbec5.appspot.com",
  messagingSenderId: "873045327469",
  appId: "1:873045327469:web:62bf0fad5b10a60fcfc964"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getFirestore()
const auth = getAuth()

export default app;

export {
  auth ,database
}