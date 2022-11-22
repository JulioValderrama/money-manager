import supertest from 'supertest';

import { AccountsList } from '../../models/accountsList';
import { User } from '../../models/user';
import app from '../../server';

const request = supertest(app);

describe('<<<<<<<<<<<<<<<<<< TESTING ACCOUNTS LIST Handler >>>>>>>>>>>>>>>>>>>>>>> ', () => {
  describe('Testing ACCOUNTS LIST  CRUD API endpoints \n', () => {
    const accounts: AccountsList = {
      name: 'test',
      amount_account_currency: 10,
      amount_default_currency: 15,
      included_total: 'yes',
      currency_id: 1,
      user_id: 3
    };
    const accounts1: AccountsList = {
      name: 'test1',
      amount_account_currency: 110,
      amount_default_currency: 115,
      included_total: 'no',
      currency_id: 1,
      user_id: 3
    };
    const user1: User = {
      email: 'HANDLER',
      username: 'test',
      password: 'password123'
    };

    let token = 'Bearer ';

    beforeAll(async () => {
      const user = await request.post('/api/users').send(user1);
      token += user.body;
    });

    it('should CREATE = /api/accounts (POST) create new ACCOUNTS ', async () => {
      const result = await request.post('/api/accounts').send(accounts).set('Authorization', token);
      const result2 = await request.post('/api/accounts').send(accounts1).set('Authorization', token);
      expect(result.status).toEqual(201);
      expect(result2.body.name).toEqual('test1');
    });

    it('should INDEX = /api/accounts (GET) get a list of all ACCOUNTS ', async () => {
      const result = await request.get('/api/accounts');
      expect(result.status).toEqual(200);
    });

    it('should SHOW = /api/accounts/1 (GET) get the ACCOUNTS with id = 1 ', async () => {
      const result = await request.get('/api/accounts/1');
      expect(result.status).toEqual(200);
    });

    it('should DELETE = /api/accounts/1 (DELETE) the ACCOUNTS with id provided ', async () => {
      const result2 = await request.delete('/api/accounts/1').set('Authorization', token);
      expect(result2.status).toEqual(200);
    });
  });
});
