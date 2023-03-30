import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6Oio-Aq2XIJI8IL2RKj98_9wNXPwnYYk",
    authDomain: "whatsapp-clone-31414.firebaseapp.com",
    projectId: "whatsapp-clone-31414",
    storageBucket: "whatsapp-clone-31414.appspot.com",
    messagingSenderId: "418003580224",
    appId: "1:418003580224:web:1c86debd290e0a146876a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }