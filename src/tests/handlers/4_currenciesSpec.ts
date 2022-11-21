import supertest from 'supertest';

import { Currency } from '../../models/currency';
import { User } from '../../models/user';
import app from '../../server';

const request = supertest(app);

describe('<<<<<<<<<<<<<<<<<< TESTING CURRENCY Handler >>>>>>>>>>>>>>>>>>>>>>> ', () => {
  describe('Testing CURRENCY CRUD API endpoints \n', () => {
    const currency: Currency = {
      name: 'GBP'
    };
    const currency2: Currency = {
      name: 'TETETE'
    };
    const user1: User = {
      email: 'UserCurrency',
      username: 'testUserCurrency',
      password: 'password123'
    };

    let token = 'Bearer ';

    beforeAll(async () => {
      const user = await request.post('/api/users').send(user1);
      token += user.body;
    });

    it('should CREATE = /api/currency (POST) create new CURRENCY ', async () => {
      const result = await request.post('/api/currency').send(currency).set('Authorization', token);
      const result2 = await request.post('/api/currency').send(currency2).set('Authorization', token);
      expect(result.body).toEqual({ id: 1, name: 'GBP' });
      expect(result2.status).toEqual(201);
    });

    it('should INDEX = /api/currency (GET) get a list of all CURRENCY ', async () => {
      const result = await request.get('/api/currency');
      expect(result.status).toEqual(200);
    });

    it('should SHOW = /api/currency/1 (GET) get the CURRENCY with id = 1 ', async () => {
      const result = await request.get('/api/currency/1');
      expect(result.status).toEqual(200);
    });

    it('should DELETE = /api/currency/1 (DELETE) the CURRENCY with id provided ', async () => {
      const result2 = await request.delete('/api/currency/2').set('Authorization', token);
      expect(result2.status).toEqual(200);
    });
  });
});
