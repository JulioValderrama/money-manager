import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import { User, UserStore } from '../models/user';
import formatError from '../utilities/formatError';
import verifyAuthToken from '../middleware/auth';

const store = new UserStore();

// INDEX = app.get('/api/users', index)

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    if (result.length == 0) {
      throw new Error('No results FOUND in USERS table');
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

// SHOW = app.get('/api/users/:id', show);

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.show(req.params.id);
    if (result == undefined) {
      throw new Error(`No results FOUND for USER with id = ${req.params.id}`);
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

// CREATE = app.post('/api/users', create);

const create = async (req: Request, res: Response) => {
  const user: User = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };
  try {
    const result = await store.create(user);
    const { TOKEN_SECRET } = process.env;
    const token = jwt.sign({ user: result }, TOKEN_SECRET as Secret);
    res.status(201).json(token);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

// DELETE = app.delete('/api/users/:id', destroy)

const destroy = async (req: Request, res: Response) => {
  try {
    const result = await store.delete(req.params.id);
    if (result == undefined) {
      throw new Error(`No User found with id = ${req.params.id}`);
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

// LOGIN = app.post('/users/login', authenticate)

const authenticate = async (req: Request, res: Response) => {
  try {
    const result = await store.authenticate(req.body.username, req.body.password);
    const { TOKEN_SECRET } = process.env;
    const token = jwt.sign({ username: result.username }, TOKEN_SECRET as Secret);
    res.status(200).json(token);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(401).json(formatedError);
  }
};

// USERS ROUTES

const usersRoutes = (app: express.Application) => {
  // CRUD Routes
  app.get('/api/users', verifyAuthToken, index);
  app.get('/api/users/:id', verifyAuthToken, show);
  app.post('/api/users', create);
  app.delete('/api/users/:id', verifyAuthToken, destroy);

  // AUTHENTICATION & LOGIN routes
  app.post('/api/users/login', authenticate);
};

export default usersRoutes;
