import express, { Request, Response } from 'express';

import { Accounts, AccountsStore } from '../models/accounts';
import formatError from '../utilities/formatError';

const store = new AccountsStore();

// INDEX = app.get('/api/accounts', index)

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    if (result.length == 0) {
      throw new Error('No results FOUND in ACCOUNTS table');
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

// SHOW = app.get('/api/accounts/:id', show);

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.show(req.params.id);
    if (result == undefined) {
      throw new Error(`No results FOUND for ACCOUNTS with id = ${req.params.id}`);
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

const create = async (req: Request, res: Response) => {
  const accounts: Accounts = {
    name: req.body.name,
    amount_account_currency: req.body.amount_account_currency,
    amount_default_currency: req.body.amount_default_currency,
    included_total: req.body.included_total,
    currency_id: req.body.currency_id,
    user_id: req.body.user_id
  };
  try {
    const result = await store.create(accounts);
    res.status(201).json(result);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

// DELETE = app.delete('/api/accounts/:id', destroy)

const destroy = async (req: Request, res: Response) => {
  try {
    const result = await store.delete(req.params.id);
    if (result == undefined) {
      throw new Error(`No ACCOUNTS found with id = ${req.params.id}`);
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

// CURRENCY ROUTES

const accountsRoutes = (app: express.Application) => {
  app.get('/api/accounts', index);
  app.get('/api/accounts/:id', show);
  app.post('/api/accounts', create);
  app.delete('/api/accounts/:id', destroy);
};

export default accountsRoutes;
