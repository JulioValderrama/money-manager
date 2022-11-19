import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();

const PORT = 3000;

app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello Worldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');
});

app.listen(PORT, function () {
  console.log(`starting app on: http://localhost:${PORT}`);
});

console.log('Working');
