import express, { Request, Response } from 'express';

import { AppQueries } from './appQueriesModel';
import formatError from '../utilities/formatError';
import verifyAuthToken from '../middleware/auth';

const store = new AppQueries();

const getBalanceInTotal = async (req: Request, res: Response) => {
  try {
    const result = await store.getBalanceInTotal(req.params.category_type_name);
    console.log(req.params.category_type_name);
    res.status(200).json(result);
  } catch (err) {
    const formatedError = formatError(err);
    res.status(400).json(formatedError);
  }
};

const appQueriesRoutes = (app: express.Application) => {
  app.get('/api/get-balance-in-total/:category_type_name', getBalanceInTotal);
};

export default appQueriesRoutes;
