import supertest from 'supertest';

import { Account } from '../../models/account';
import { User } from '../../models/user';
import app from '../../server';

const request = supertest(app);

describe('<<<<<<<<<<<<<<<<<< TESTING ACCOUNT Handler >>>>>>>>>>>>>>>>>>>>>>> ', () => {
  describe('Testing ACCOUNT CRUD API endpoints \n', () => {
    const account: Account = {
      date: '01/01/2022',
      amount_account_currency: 20,
      comment: 'This is for a test',
      accounts_id: 2,
      category_id: 1
    };
    const account1: Account = {
      date: '10/01/2022',
      amount_account_currency: 20,
      comment: 'This is for a test 1',
      accounts_id: 2,
      category_id: 1
    };
    const user1: User = {
      email: 'Account User',
      username: 'test User',
      password: 'password123'
    };

    let token = 'Bearer ';

    beforeAll(async () => {
      const user = await request.post('/api/users').send(user1);
      token += user.body;
    });

    it('should CREATE = /api/account (POST) create new ACCOUNT ', async () => {
      const result = await request.post('/api/account').send(account).set('Authorization', token);
      const result2 = await request.post('/api/account').send(account1).set('Authorization', token);
      expect(result.status).toEqual(201);
      expect(result2.status).toEqual(201);
    });

    it('should INDEX = /api/account (GET) get a list of all ACCOUNT ', async () => {
      const result = await request.get('/api/account');
      expect(result.status).toEqual(200);
    });

    it('should SHOW = /api/account/1 (GET) get the ACCOUNT with id = 1 ', async () => {
      const result = await request.get('/api/account/1');
      expect(result.status).toEqual(200);
    });

    it('should DELETE = /api/account/1 (DELETE) the ACCOUNT with id provided ', async () => {
      const result2 = await request.delete('/api/account/2').set('Authorization', token);
      expect(result2.status).toEqual(200);
    });
  });
});
