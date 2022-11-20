import express, { Request, Response } from 'express';

import { Category, CategoryStore } from '../models/category';
import formatError from '../utilities/formatError';

const store = new CategoryStore();

const create = async (req: Request, res: Response) => {
  const category: Category = {
    name: req.body.name,
    category_type_id: req.body.category_type_id
  };
  try {
    const result = await store.create(category);
    res.status(201).json(result);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

const categoryRoutes = (app: express.Application) => {
  app.post('/api/category', create);
};

export default categoryRoutes;
