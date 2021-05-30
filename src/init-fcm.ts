import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/messaging';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// const initializedFirebaseApp = firebase.initializeApp({
//      // Project Settings => Add Firebase to your web app
//      messagingSenderId: "576192852555",
// });

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: 'AIzaSyA1MVOuDazXDae422bsawFoZ311H0QDoUM',
    authDomain: 'herzbegleiter-5ffbc.firebaseapp.com',
    projectId: 'herzbegleiter-5ffbc',
    storageBucket: 'herzbegleiter-5ffbc.appspot.com',
    messagingSenderId: '576192852555',
    appId: '1:576192852555:web:648289aad705e20fb293ce',
    measurementId: 'G-4QFVWT2Q7X',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const messagingBrowser = firebase.messaging;
// export { messaging };