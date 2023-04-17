// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCd3C4ptbH72lWkHh7Vdl2s0SlRxQapyJ0",
    authDomain: "accessorize-79c54.firebaseapp.com",
    projectId: "accessorize-79c54",
    storageBucket: "accessorize-79c54.appspot.com",
    messagingSenderId: "166776908645",
    appId: "1:166776908645:web:660dad381feb78f88f4f8c"
};

const app = initializeApp(firebaseConfig);


// Initialize Firebase
module.exports = app;