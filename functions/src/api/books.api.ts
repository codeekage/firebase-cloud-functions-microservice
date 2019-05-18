import * as express from "express";
import * as cors from "cors";
import {
  handleLogin,
  handleLogout
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
service.get("/", handleFetchBooks);
service.post("/", handleAddBooks);
service.get("/:id", handleFetchBooksById);
service.put("/:id", handleUpdateBookById);
service.delete("/:id", handleDeleteBookById);
service.get("/logout", handleLogout);
