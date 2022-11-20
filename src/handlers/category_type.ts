import express, { Request, Response } from 'express';

import { CategoryTypeStore } from '../models/category-type';
import formatError from '../utilities/formatError';

const store = new CategoryTypeStore();

const create = async (req: Request, res: Response) => {
  try {
    const result = await store.create(req.body.name);
    res.status(201).json(result);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

const categoryTypeRoutes = (app: express.Application) => {
  app.post('/api/category-type', create);
};

export default categoryTypeRoutes;
