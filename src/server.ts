import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './handlers/users';
import categoryTypeRoutes from './handlers/category_type';
import categoryRoutes from './handlers/category';
import currencyRoutes from './handlers/currencies';
import accountsRoutes from './handlers/accounts';
import accountRoutes from './handlers/account';

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
