import express, { Request, Response } from 'express';

import { Category, CategoryStore } from '../models/category';
import formatError from '../utilities/formatError';

const store = new CategoryStore();

// INDEX = app.get('/api/category', index)

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    if (result.length == 0) {
      throw new Error('No results FOUND in CATEGORY table');
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

// SHOW = app.get('/api/category/:id', show);

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.show(req.params.id);
    if (result == undefined) {
      throw new Error(`No results FOUND for CATEGORY with id = ${req.params.id}`);
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

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

// DELETE = app.delete('/api/category/:id', destroy)

const destroy = async (req: Request, res: Response) => {
  try {
    const result = await store.delete(req.params.id);
    if (result == undefined) {
      throw new Error(`No CATEGORY found with id = ${req.params.id}`);
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

// CATEGORY-TYPES ROUTES

const categoryRoutes = (app: express.Application) => {
  // CRUD Routes
  app.get('/api/category', index);
  app.get('/api/category/:id', show);
  app.post('/api/category', create);
  app.delete('/api/category/:id', destroy);
};

export default categoryRoutes;
