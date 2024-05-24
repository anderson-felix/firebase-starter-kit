// Import the functions you need from the SDKs you need
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

const firebaseConfig = {
  apiKey: 'AIzaSyBoalDDHkIQCr9sAqJ5LN96k8OfnhaN4m4',
  authDomain: 'clustfy-420.firebaseapp.com',
  projectId: 'clustfy-420',
  storageBucket: 'clustfy-420.appspot.com',
  messagingSenderId: '120532651336',
  appId: '1:120532651336:web:a2959bfceb5187cf2f777d',
  measurementId: 'G-P4587RW79F',
};

admin.initializeApp({
  credential: admin.credential.cert(JSON.stringify(firebaseConfig)),
  databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
});

const firestore = admin.firestore();
fireorm.initialize(firestore);
