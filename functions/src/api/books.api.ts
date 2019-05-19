import * as express from "express";
import * as cors from "cors";
import {
  handleLogin, handleLogout,
} from "../controllers/auth.handler";
import {
  handleAddBooks,
  handleUpdateBookById,
  handleDeleteBookById,
  handleFetchBooks,
  handleFetchBooksById
} from "../controllers/books.handler";
export const service = express();

service.use(cors());

service.post("/login", handleLogin);
service.get("/fetch", handleFetchBooks);
service.post("/add", handleAddBooks);
service.get("fetch/:id", handleFetchBooksById);
service.put("update/:id", handleUpdateBookById);
service.delete("remove/:id", handleDeleteBookById);
service.get("/logout", handleLogout);
