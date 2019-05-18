import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyAqxhRscnUlQb2IlsirOfsitET50rXS6nQ",
  authDomain: "fire-bookstore.firebaseapp.com",
  databaseURL: "https://fire-bookstore.firebaseio.com",
  projectId: "fire-bookstore",
  storageBucket: "fire-bookstore.appspot.com",
  messagingSenderId: "285899056065",
  appId: "1:285899056065:web:39d3f014f7232a8c"
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
