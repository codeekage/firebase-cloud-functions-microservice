import * as firebase from "firebase";

const config = {
  apiKey: "AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXQ",
  authDomain: "<APP_NAME>.firebaseapp.com",
  databaseURL: "https://<APP_NAME>.firebaseio.com",
  projectId: "<PROJECT_ID>",
  storageBucket: "<PROJECT_ID>.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
};

firebase.initializeApp(config);

export default class FirebaseService {
  auth = firebase.auth();
  firestore = firebase.firestore();
  constructor() {
    this.auth = this.auth;
    this.firestore = this.firestore;
  }
}
