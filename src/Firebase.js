
// Your web app's Firebase configuration
import Firebase from 'firebase'
let firebaseConfig = {
    apiKey: "AIzaSyCCR3qWPqfPbrVbVWIy4CGOrq27TYUdMQs",
    authDomain: "onboardingtarget.firebaseapp.com",
    databaseURL: "https://onboardingtarget.firebaseio.com",
    projectId: "onboardingtarget",
    storageBucket: "onboardingtarget.appspot.com",
    messagingSenderId: "953666810116",
    appId: "1:953666810116:web:47451419cfbcb1c1"
};

// Initialize Firebase
Firebase.initializeApp(firebaseConfig);

export default Firebase;