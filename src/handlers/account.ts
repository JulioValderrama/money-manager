import express, { Request, Response } from 'express';

import { Account, AccountStore } from '../models/account';
import formatError from '../utilities/formatError';
import getDefaultCurrency from '../utilities/getDefaultCurrency';
import { AccountsStore } from '../models/accounts';

const store = new AccountStore();
const accountsStore = new AccountsStore();

const create = async (req: Request, res: Response) => {
  const account: Account = {
    date: req.body.date,
    amount_account_currency: req.body.amount_account_currency,
    comment: req.body.comment,
    accounts_id: req.body.accounts_id,
    category_id: req.body.category_id
  };
  try {
    account.amount_default_currency = await getDefaultCurrency(
      account.accounts_id,
      'GBP',
      account.amount_account_currency
    );
    const result = await store.create(account);
    const updateAccountsTotal = await accountsStore.updateTotal(account.accounts_id, account.category_id);
    console.log(
      `${account.amount_account_currency}$ has been added to the total amount of this account with a new updated TOTAL of ${updateAccountsTotal?.amount_account_currency}$`
    );
    console.log(`The currency converted amount is ${account.amount_default_currency}`);
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
