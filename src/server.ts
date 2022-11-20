import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './handlers/users';
import convertCurrency from './services/apis/convert-currency';

const app: express.Application = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello Worldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');
});

// API ROUTES

usersRoutes(app);

const prueba = async () => {
  const result = await convertCurrency('EUR', 'GBP', 40);
  console.log(result);
};

prueba();

//const euros = convertCurrency('EUR', 'GBP', 10);

app.listen(port, function () {
  console.log(`starting app on: http://localhost:${port}`);
});

console.log('Working');
