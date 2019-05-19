import * as firebase from "firebase";
import {firebaseConfig} from '../keys'
firebase.initializeApp(firebaseConfig);

export default class FirebaseService {
  auth = firebase.auth();
  firestore = firebase.firestore();
  constructor() {
    this.auth = this.auth;
    this.firestore = this.firestore;
  }
}
