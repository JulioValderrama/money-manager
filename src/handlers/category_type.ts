import express, { Request, Response } from 'express';

import { CategoryTypeStore } from '../models/category-type';
import formatError from '../utilities/formatError';

const store = new CategoryTypeStore();

// INDEX = app.get('/api/category-type', index)

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

// SHOW = app.get('/api/category-type/:id', show);

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

// CREATE = app.post('/api/category-type', create);

const create = async (req: Request, res: Response) => {
  try {
    const result = await store.create(req.body.name);
    res.status(201).json(result);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

// DELETE = app.delete('/api/category-type/:id', destroy)

const destroy = async (req: Request, res: Response) => {
  try {
    const result = await store.delete(req.params.id);
    if (result == undefined) {
      throw new Error(`No PRODUCT found with id = ${req.params.id}`);
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

// CATEGORY-TYPES ROUTES

const categoryTypeRoutes = (app: express.Application) => {
  // CRUD Routes
  app.get('/api/category-type', index);
  app.get('/api/category-type/:id', show);
  app.post('/api/category-type', create);
  app.delete('/api/category-type/:id', destroy);
};

export default categoryTypeRoutes;
