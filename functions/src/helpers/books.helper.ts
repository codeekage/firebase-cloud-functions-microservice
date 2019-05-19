import FirebaseService from "./firebase.helper";

/**
 * Result Set 
 */
interface Result {
  success: boolean;
  data: {} | undefined;
}

interface Book{
  title : string,
  isbn : string,
  created: string,
  avaliable : boolean | true | false

}

//extend the FIrebase Helper class
export default class Books extends FirebaseService {
  /**
   * add a new Book to the Firestore
   * @param booksObject takes an object of Books {
   *  title : string,
   *  isbn : string,
   *  created: date,
   *  avaliable : boolean | true | false
   * }
   */
  async addBooks(booksObject: Book): Promise<Result> {
    try {
      const user = await this.auth.currentUser;
      if (user) {
        const books = await this.firestore.collection("books").add(booksObject);
        const snapshot = await books.get();
        return Promise.resolve({ success: true, data: snapshot.data() });
      }
      return Promise.reject({
        success: false,
        error : {
          type: "Authentication Error",
          message: "You don't have the Permission to do this.."
        }
      });
    } catch (error) {
      console.error(error);
      return Promise.reject({ success: false, error });
    }
  }

  /**
   * Fetch list of Books 
   */
  async fetchAllBooks(): Promise<Result> {
    try {
      const user = await this.auth.currentUser;
      if (user) {
        const result = new Array();
        const snapshot = await this.firestore.collection("books").get();
        snapshot.forEach(async books => {
          const id = {_id: books.id}
          const data = books.data()
          const resolveObjects =  Object.assign({}, id, data)
          await result.push(resolveObjects);
        });
        return Promise.resolve({ success: true, data :result });
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

  /**
   * 
   * @param id Get `BookList` with the specified `id`
   */
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


  /**
   * Updates the `Book Collection` with the specified `Document ID` 
   * @param id `Document ID` of the `Book Collection` to update
   * @param updates Fields to update 
   */
  async updateBookById(id: string, updates: Book): Promise<Result> {
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

  /**
   * Deletes a `Book` from `Book Collection` with the specified `ID`
   * @param id `Document Reference ID` to delete a `Book` 
   */
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
