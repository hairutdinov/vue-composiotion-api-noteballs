// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyB5y7_lxnJkKCx9TBJRpEEtPM2WBTuYV1M',
    authDomain: 'noteballs-7361f.firebaseapp.com',
    projectId: 'noteballs-7361f',
    storageBucket: 'noteballs-7361f.appspot.com',
    messagingSenderId: '797698819396',
    appId: '1:797698819396:web:d43820df37152adffd4311'
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}