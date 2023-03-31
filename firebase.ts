import {getApp,getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1-14lo9i053c_e64fGb-O9cGNGFeFIQU",
  authDomain: "chat-gpt-messenger-24c6e.firebaseapp.com",
  projectId: "chat-gpt-messenger-24c6e",
  storageBucket: "chat-gpt-messenger-24c6e.appspot.com",
  messagingSenderId: "609491728494",
  appId: "1:609491728494:web:7b3e13212b83ba01818e7f"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};