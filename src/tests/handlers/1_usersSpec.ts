import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';

import { User } from '../../models/user';
import app from '../../server';

const request = supertest(app);

describe('<<<<<<<<<<<<<<<<<< TESTING USERS Handler >>>>>>>>>>>>>>>>>>>>>>>', () => {
  describe('Testing Users CRUD API endpoints \n', () => {
    const user1: User = {
      email: 'HANDLER',
      username: 'test',
      password: 'password123'
    };

    const user2: User = {
      email: 'HANDLER2',
      username: 'test2',
      password: 'password123'
    };

    const { TOKEN_SECRET } = process.env;
    let token = 'Bearer ';

    it('should CREATE = /api/users (POST) create new USER ', async () => {
      const result = await request.post('/api/users').send(user1);
      const result2 = await request.post('/api/users').send(user2);
      token += result.body;
      expect(result.status).toEqual(201);
      expect(result2.status).toEqual(201);
    });

    it('should INDEX = /api/users (GET) get a list of all USERS ', async () => {
      const result = await request.get('/api/users').set('Authorization', token);
      expect(result.status).toEqual(200);
    });

    it('should SHOW = /users/1 (GET) get the USER with id = 1 ', async () => {
      const result = await request.get('/api/users/1').set('Authorization', token);
      expect(result.status).toEqual(200);
    });

    it('should AUTHENTICATE = /users/login (POST) verify the token when login ', async () => {
      const response = await request
        .post('/api/users/login')
        .send({ username: user1.username, password: user1.password });
      const result = jwt.verify(response.body, TOKEN_SECRET as Secret);
      expect(result).toBeTruthy();
    });

    it('should DELETE = /users/1 (DELETE) the USER with id provided ', async () => {
      const result = await request.delete('/api/users/1').set('Authorization', token);
      const result2 = await request.delete('/api/users/2').set('Authorization', token);
      expect(result.status).toEqual(200);
      expect(result2.status).toEqual(200);
    });
  });
});
