import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/database'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyC_rKDik_dLNWno88FbJm79QrxZp4EyZvA",
    authDomain: "kahunt-218617.firebaseapp.com",
    databaseURL: "https://kahunt-218617.firebaseio.com",
    projectId: "kahunt-218617",
    storageBucket: "kahunt-218617.appspot.com",
    messagingSenderId: "81769943797"
  };
  firebase.initializeApp(config)

  export default firebase