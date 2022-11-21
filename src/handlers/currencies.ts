import express, { Request, Response } from 'express';

import { Currency, CurrencyStore } from '../models/currency';
import formatError from '../utilities/formatError';
import verifyAuthToken from '../middleware/auth';

const store = new CurrencyStore();

// INDEX = app.get('/api/currency', index)

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    if (result.length == 0) {
      throw new Error('No results FOUND in CURRENCY table');
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

// SHOW = app.get('/api/currency/:id', show);

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.show(req.params.id);
    if (result == undefined) {
      throw new Error(`No results FOUND for CURRENCY with id = ${req.params.id}`);
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

const create = async (req: Request, res: Response) => {
  const currency: Currency = {
    name: req.body.name
  };
  try {
    const result = await store.create(currency);
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
      throw new Error(`No CURRENCY found with id = ${req.params.id}`);
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

// CURRENCY ROUTES

const currencyRoutes = (app: express.Application) => {
  // CRUD Routes
  app.get('/api/currency', index);
  app.get('/api/currency/:id', show);
  app.post('/api/currency', verifyAuthToken, create);
  app.delete('/api/currency/:id', verifyAuthToken, destroy);

  // OTHER ROUTES
  app.get('/api/currency/createAll', createAll);
};

export default currencyRoutes;

// OTHER ROUTES

const createAll = async (_req: Request, res: Response) => {
  try {
    const result = await store.createAll();
    res.status(201).json(JSON.stringify(result));
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};
