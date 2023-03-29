import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref  } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNokqHKOeyeSH6PhdjYkJfq7-DjYczSbw",
  authDomain: "experteamai.firebaseapp.com",
  projectId: "experteamai",
  storageBucket: "experteamai.appspot.com",
  messagingSenderId: "1010743331109",
  appId: "1:1010743331109:web:4866b3f8c35824c51332cc",
  measurementId: "G-5K5XT9WX6V"
};



// Initialize Firebase
const app = getApps().length?getApp():initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
//const storageRef = ref(storage);


export{db,storage}
