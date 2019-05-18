import Books from "../helpers/books.helper";
import { Request, Response } from "express";


const books = new Books();

export async function handleAddBooks(req : Request, res: Response){
    try{
        const newBook = await books.addBooks(req.body);
        res.send(newBook)
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchBooks(req: Request, res : Response){
    try {
        const fetch = await books.fetchAllBooks();
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleFetchBooksById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await books.fetchBooksById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleUpdateBookById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await books.updateBookById(id, req.body);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export async function handleDeleteBookById(req : Request, res: Response){
    try {
        const {id} = req.params;
        const fetch = await books.delteBookById(id);
        res.send(fetch)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}