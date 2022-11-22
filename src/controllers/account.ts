import express, { Request, Response } from 'express';

import { Account, AccountStore } from '../models/account';
import { AccountsStore } from '../models/accounts';
import CurrencyServices from '../services/currencyServices';
import formatError from '../utilities/formatError';

const store = new AccountStore();
const accountsStore = new AccountsStore();
const currencyServices = new CurrencyServices();

// INDEX = app.get('/api/account', index)

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    if (result.length == 0) {
      throw new Error('No results FOUND in ACCOUNT table');
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

// SHOW = app.get('/api/account/:id', show);

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.show(req.params.id);
    if (result == undefined) {
      throw new Error(`No results FOUND for ACCOUNT with id = ${req.params.id}`);
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

const create = async (req: Request, res: Response) => {
  const account: Account = {
    date: req.body.date,
    amount_account_currency: req.body.amount_account_currency,
    comment: req.body.comment,
    accounts_id: req.body.accounts_id,
    category_id: req.body.category_id
  };
  try {
    account.amount_default_currency = await currencyServices.getDefaultCurrency(
      account.accounts_id,
      'EUR',
      account.amount_account_currency
    );
    const result = await store.create(account);
    await accountsStore.updateTotal(account.accounts_id, account.category_id);
    res.status(201).json(result);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

// DELETE = app.delete('/api/account/:id', destroy)

const destroy = async (req: Request, res: Response) => {
  try {
    const result = await store.delete(req.params.id);
    if (result == undefined) {
      throw new Error(`No ACCOUNT found with id = ${req.params.id}`);
    }
    res.status(200).json(result);
  } catch (error) {
    const formatedError = formatError(error);
    res.status(400).json(formatedError);
  }
};

// CURRENCY ROUTES

const accountRoutes = (app: express.Application) => {
  app.get('/api/account', index);
  app.get('/api/account/:id', show);
  app.post('/api/account', create);
  app.delete('/api/account/:id', destroy);
};

export default accountRoutes;
