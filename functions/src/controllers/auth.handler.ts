import { Request, Response } from "express";
import * as serviceRequest from "request-promise";
import AuthService from "../helpers/auth.helper";
const auth = new AuthService();

const http = "https://us-central1-fire-bookstore.cloudfunctions.net";

export async function handleAsyncLogin(request: Request, response: Response) {
  try {
    const { email, password } = request.body;
    const login = await auth.login(email, password);
    const books = await innerLogin(`${http}/book/login`, { email, password });
    const user = await innerLogin(`${http}/user/login`, { email, password });
    response.send({ login, books, user });
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
}

export async function handleLogin(request: Request, response: Response) {
  try {
    const { email, password } = request.body;
    const loggedIn = await auth.login(email, password);
    response.send(loggedIn);
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
}

export async function handleAsyncLogout(request: Request, response: Response) {
  try {
    const nodes = await auth.logout();
    const books = await innerLogout( `${http}/book/logout`)
    const user = await innerLogout( `${http}/user/logout`)
    response.send({ nodes, books, user });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error });
  }
}

export async function handleLogout(request: Request, response: Response) {
  try {
    const nodes = await auth.logout();
    response.send(nodes);
  } catch (error) {
    console.error(error);
    response.status(500).send({ error });
  }
}

export async function handleSignUp(request: Request, response: Response) {
  try {
    const { email, password } = request.body;
    const loggedIn = await auth.signUp(email, password);
    response.send(loggedIn);
  } catch (error) {
    console.error(error);
    response.status(500).send({ error });
  }
}

export async function currentUser(request: Request, response: Response) {
  try {
    const user = await auth.currentUser();
    response.send({ user });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error });
  }
}

export async function handleUserUpdate(request: Request, response: Response) {
  try {
    const update = request.body;
    const user = await auth.updateUser(update);
    response.send({ user });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error });
  }
}

/* function callBack(error: any, responses: any, body: any) {
  !error && responses.statusCode === 200 ? body : error;

  console.log(body);
  console.log(error);
}
 */

async function innerLogin(uri: string, body: object) {
  try {
    const request = await serviceRequest({
      method: "POST",
      uri,
      body,
      json: true
    });
    return Promise.resolve(request);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function innerLogout(uri: string){
  try {
    const books = await serviceRequest({
      uri,
      json: true
    });
    return Promise.resolve(books)
  } catch (error) {
    return Promise.reject(error)
  }
}
