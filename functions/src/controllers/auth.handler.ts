import { Request, Response } from "express";
import * as serviceRequest from "request";
import AuthService from "../helpers/auth.helper";
const auth = new AuthService();

const http = "https://us-central1-fire-bookstore.cloudfunctions.net";
//const http = 'http://localhost:5000/save-ease/us-central1'

export async function handleAsyncLogin(request: Request, response: Response) {
  try {
    const { email, password } = request.body;
    const loggedIn = await auth.login(email, password);
    const books = await serviceRequest.post({
      url: `${http}/books/login?email=${email}&password=${password}`
    });
    if (!books) {
      response
        .status(500)
        .send({ error: `It looks like a container didn't log in` });
      return;
    } else {
      response.send(loggedIn);
    }
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
}

export async function handleLogin(request: Request, response: Response) {
  try {
    const { email, password } = request.query;
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
    serviceRequest(`${http}/books/logout`, callBack);
    response.send(nodes);
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
    const loggedIn = await auth.signUpEmail(email, password);
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

function callBack(error: any, responses: any, body: any) {
  !error && responses.statusCode === 200 ? body : error;

  console.log(body);
  console.log(error);
}
