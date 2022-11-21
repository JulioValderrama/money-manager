import supertest from 'supertest';

import { CategoryType } from '../../models/category-type';
import { User } from '../../models/user';
import app from '../../server';

const request = supertest(app);

describe('<<<<<<<<<<<<<<<<<< TESTING CATEGORY-TYPE Handler >>>>>>>>>>>>>>>>>>>>>>> ', () => {
  describe('Testing CATEGORY-TYPE CRUD API endpoints \n', () => {
    const categoryType: CategoryType = {
      name: 'Income'
    };
    const categoryType2: CategoryType = {
      name: 'Expenses'
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

    it('should CREATE = /api/category-type (POST) create new CATEGORY-TYPE ', async () => {
      const result = await request.post('/api/category-type').send(categoryType).set('Authorization', token);
      const result2 = await request
        .post('/api/category-type')
        .send(categoryType2)
        .set('Authorization', token);
      expect(result.status).toEqual(201);
      expect(result2.status).toEqual(201);
    });

    it('should INDEX = /api/category-type (GET) get a list of all CATEGORY-TYPE ', async () => {
      const result = await request.get('/api/category-type');
      expect(result.status).toEqual(200);
    });

    it('should SHOW = /api/category-type/1 (GET) get the CATEGORY-TYPE with id = 1 ', async () => {
      const result = await request.get('/api/category-type/1');
      expect(result.status).toEqual(200);
    });

    it('should DELETE = /api/category-type/1 (DELETE) the CATEGORY-TYPE with id provided ', async () => {
      const result2 = await request.delete('/api/category-type/2').set('Authorization', token);
      expect(result2.status).toEqual(200);
    });
  });
});
