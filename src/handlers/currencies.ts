import express, { Request, Response } from 'express';

import { Currency, CurrencyStore } from '../models/currency';
import formatError from '../utilities/formatError';

const store = new CurrencyStore();

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

const createAll = async (_req: Request, res: Response) => {
  try {
    const result = await store.createAll();
    res.status(201).json(JSON.stringify(result));
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

const currencyRoutes = (app: express.Application) => {
  app.post('/api/currency', create);
  app.get('/api/currency/createAll', createAll);
};

export default currencyRoutes;
