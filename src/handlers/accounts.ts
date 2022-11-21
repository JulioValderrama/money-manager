import express, { Request, Response } from 'express';

import { Accounts, AccountsStore } from '../models/accounts';
import formatError from '../utilities/formatError';

const store = new AccountsStore();

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

const accountsRoutes = (app: express.Application) => {
  app.post('/api/accounts', create);
};

export default accountsRoutes;
