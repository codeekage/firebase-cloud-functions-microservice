import * as firebase from "firebase";

const config = {
  apiKey: "AXXXXXXXXXXXXXXXXXXXXXXXXXXXXQ",
  authDomain: "<APP-NAME>.firebaseapp.com",
  databaseURL: "https://<APP-NAME>.firebaseio.com",
  projectId: "<APP-NAME>",
  storageBucket: "<APP-NAME>.appspot.com",
  messagingSenderId: "XXXXXXXX",
  appId: "XXXXXXXXX:web:XXXXXXXX"
};

firebase.initializeApp(config);

export default class FirebaseService {
  /**
   * Firebase Authentication function
   */
  auth = firebase.auth();
  /**
   * Firebase Firestore functions
   */
  firestore = firebase.firestore();
  constructor() {
    this.auth = this.auth;
    this.firestore = this.firestore;
  }
}
