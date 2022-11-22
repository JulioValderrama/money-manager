import express, { Request, Response } from 'express';

import { AppQueries } from './appQueriesModel';
import formatError from '../utilities/formatError';
import verifyAuthToken from '../middleware/auth';

const store = new AppQueries();

// Get the total of all Accounts included in Total per EXPENSES or INCOME

const getBalanceInTotal = async (req: Request, res: Response) => {
  try {
    const result = await store.getBalanceInTotal(req.params.category_type_name);
    res.status(200).json(result);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

// Get the total Balance per account when name provided

const getBalancePerAccount = async (req: Request, res: Response) => {
  try {
    const result = await store.getBalancePerAccount(req.params.account_name, req.params.category_type);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

const appQueriesRoutes = (app: express.Application) => {
  // Get the total of all Accounts included in Total per EXPENSES or INCOME
  app.get('/api/get-balance-in-total/:category_type_name', getBalanceInTotal);

  // Get the total Balance per account when name provided per EXPENSES or INCOME
  app.get('/api/get-balance/:account_name/:category_type', getBalancePerAccount);
};

export default appQueriesRoutes;
