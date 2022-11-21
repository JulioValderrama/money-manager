import express, { Request, Response } from 'express';

import { Account, AccountStore } from '../models/account';
import { AccountsStore } from '../models/accounts';
import formatError from '../utilities/formatError';

const store = new AccountStore();
const accountsStore = new AccountsStore();

const create = async (req: Request, res: Response) => {
  const account: Account = {
    date: req.body.date,
    amount_account_currency: req.body.amount_account_currency,
    amount_default_currency: req.body.amount_default_currency,
    comment: req.body.comment,
    accounts_id: req.body.accounts_id,
    category_id: req.body.category_id
  };
  try {
    const result = await store.create(account);
    const updateAccountsTotal = await accountsStore.updateTotal(account.accounts_id, account.category_id);
    console.log(
      `The total amount from this account has been updated to ${updateAccountsTotal?.amount_account_currency}`
    );
    res.status(201).json(result);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

const accountRoutes = (app: express.Application) => {
  app.post('/api/account', create);
};

export default accountRoutes;
