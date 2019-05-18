import FirebaseService from "./firebase.helper";

interface Result {
  success: boolean;
  data?: {};
}

//extend the FIrebase Helper class
export default class Books extends FirebaseService {
  async addBooks(booksObject: object): Promise<Result> {
    try {
      const user = await this.auth.currentUser;
      if (user) {
        const books = await this.firestore.collection("books").add(booksObject);
        const snapshot = await books.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
      }
      return Promise.reject({
        success: false,
        error: {
          type: "Authentication Error",
          message: "You don't have the Permission to do this.."
        }
      });
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  async fetchAllBooks(): Promise<Result> {
    try {
      const user = await this.auth.currentUser;
      if (user) {
        const result = new Array();
        const snapshot = await this.firestore.collection("books").get();
        snapshot.forEach(async books => {
          await result.push(books);
        });
        return Promise.resolve({ success: true, result });
      }
      return Promise.reject({
        success: false,
        error: {
          type: "Authentication Error",
          message: "You don't have the Permission to do this.."
        }
      });
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  async fetchBooksById(id: string): Promise<Result> {
    try {
      const user = await this.auth.currentUser;
      if (user) {
        const books = await this.firestore.collection("books").doc(id);
        const snapshot = await books.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
      }
      return Promise.reject({
        success: false,
        error: {
          type: "Authentication Error",
          message: "You don't have the Permission to do this.."
        }
      });
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  async updateBookById(id: string, updates: object): Promise<Result> {
    try {
      const user = await this.auth.currentUser;
      if (user) {
        const books = await this.firestore.collection("books").doc(id);
        if (books) {
          await books.update(updates);
        }
        const updated = await this.firestore.collection("books").doc(id);
        const snapshot = await updated.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
      }
      return Promise.reject({
        success: false,
        error: {
          type: "Authentication Error",
          message: "You don't have the Permission to do this.."
        }
      });
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  async delteBookById(id: string): Promise<Result> {
    try {
      const user = await this.auth.currentUser;
      if (user) {
        const books = await this.firestore.collection("books").doc(id);
        if (books) {
          await books.delete();
        }
        const deleted = await this.firestore.collection("books").doc(id);
        const snapshot = await deleted.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
      }
      return Promise.reject({
        success: false,
        error: {
          type: "Authentication Error",
          message: "You don't have the Permission to do this.."
        }
      });
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }
}
