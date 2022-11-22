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

// To show all the EXPENSES or INCOME from a CATEGORY (Category when clicking and Account provided) FOR THE TOTAL
// INCLUDED IN TOTAL FUNCTION

const getBalanceinTotalCategory = async (req: Request, res: Response) => {
  try {
    const result = await store.getBalanceinTotalCategory(
      req.params.category_name,
      req.params.category_type_name
    );
    console.log(result);
    console.log(req.params.category_type_name);
    res.status(200).json(result);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

// Get the total Balance per account when name provided

const getTotalBalancePerAccount = async (req: Request, res: Response) => {
  try {
    const result = await store.getTotalBalancePerAccount(req.params.account_name, req.params.category_type);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

const appQueriesRoutes = (app: express.Application) => {
  // Get the total of all Accounts included in Total per EXPENSES or INCOME
  app.get('/api/balance-in-total/:category_type_name', getBalanceInTotal);

  // To show all the EXPENSES or INCOME from a CATEGORY (Category when clicking and Account provided) FOR THE TOTAL
  app.get('/api/balance-in-total-category/:category_name/:category_type_name', getBalanceinTotalCategory);

  // Get the total Balance per account when name provided per EXPENSES or INCOME
  app.get('/api/total-balance/:account_name/:category_type', getTotalBalancePerAccount);
};

export default appQueriesRoutes;
