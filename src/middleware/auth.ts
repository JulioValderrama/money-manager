import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import formatError from '../utilities/formatError';

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { TOKEN_SECRET } = process.env;
    const authorizationHeader: string = req.headers.authorization as unknown as string;

    if (authorizationHeader == undefined) throw new Error('No TOKEN provided');

    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET as Secret);
    next();
  } catch (err) {
    const formatedError = formatError(err);
    res.status(403).json(formatedError);
  }
};

export default verifyAuthToken;
