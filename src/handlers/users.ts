import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import { User, UserStore } from '../models/user';
import formatError from '../utilities/formatError';

const store = new UserStore();

const create = async (req: Request, res: Response) => {
  const user: User = {
    email: req.body.email,
    username: req.body.username,
    _password: req.body._password
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

const authenticate = async (req: Request, res: Response) => {
  try {
    const result = await store.authenticate(req.body.username, req.body.password);
    const { TOKEN_SECRET } = process.env;
    const token = jwt.sign({ username: result.username }, TOKEN_SECRET as Secret);
    res.status(200).json(token);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

const usersRoutes = (app: express.Application) => {
  app.post('/api/users', create);
  app.post('/api/users/login', authenticate);
};

export default usersRoutes;
