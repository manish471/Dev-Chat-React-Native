import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCxxU2-MBlmZBhfJzAc5enu2Bej5lUbayo",
    authDomain: "slack-app-a51f8.firebaseapp.com",
    databaseURL: "https://slack-app-a51f8.firebaseio.com",
    projectId: "slack-app-a51f8",
    storageBucket: "slack-app-a51f8.appspot.com",
    messagingSenderId: "592012234075",
    appId: "1:592012234075:web:81c92405b07c1bd3"
  };
  firebase.initializeApp(config);

export default firebase;
