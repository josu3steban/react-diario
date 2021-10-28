import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCasIX-4rWyqsSaka00gRtDnXiABaDR7yw",
  authDomain: "react-app-prueba-1.firebaseapp.com",
  projectId: "react-app-prueba-1",
  storageBucket: "react-app-prueba-1.appspot.com",
  messagingSenderId: "902884877147",
  appId: "1:902884877147:web:8b6752e745baee333ab07e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore( app );
const googleAuthProvider = new GoogleAuthProvider();

export {
    app,
    db,
    googleAuthProvider
}