import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello Worldaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');
});

app.get('/api', function (_req: Request, res: Response) {
  res.send('Hello from API route!');
});

app.listen(port, function () {
  console.log(`starting app on: http://localhost:${port}`);
});

console.log('Working');
