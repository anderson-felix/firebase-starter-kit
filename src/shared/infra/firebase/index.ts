// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBoalDDHkIQCr9sAqJ5LN96k8OfnhaN4m4',
  authDomain: 'clustfy-420.firebaseapp.com',
  projectId: 'clustfy-420',
  storageBucket: 'clustfy-420.appspot.com',
  messagingSenderId: '120532651336',
  appId: '1:120532651336:web:a2959bfceb5187cf2f777d',
  measurementId: 'G-P4587RW79F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
