import * as functions from "firebase-functions";
import { service as auths } from "./api/auth.api";
import { service as users } from "./api/user.api";
import { service as books } from "./api/books.api";
import { onCreate } from "./triggers/auth.trigger";
import { onBookArrival } from "./triggers/book.trigger";

export const auth = functions.https.onRequest(auths);
export const book = functions.https.onRequest(books);
export const user = functions.https.onRequest(users);
export const onCreateUser = functions.auth.user().onCreate(onCreate);
export const onCreateBook = functions.firestore
  .document("books/{booksId}")
  .onCreate(onBookArrival);
