import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './controllers/users';
import categoryTypeRoutes from './controllers/category_types';
import categoryRoutes from './controllers/categories';
import currencyRoutes from './controllers/currencies';
import accountsRoutes from './controllers/accounts';
import accountRoutes from './controllers/account';

const app: express.Application = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello Worldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');
});

// API ROUTES

usersRoutes(app);
categoryTypeRoutes(app);
categoryRoutes(app);
currencyRoutes(app);
accountsRoutes(app);
accountRoutes(app);

app.listen(port, function () {
  console.log(`starting app on: http://localhost:${port}`);
});

console.log('Working');

export default app;
