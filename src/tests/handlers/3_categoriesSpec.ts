import supertest from 'supertest';

import { Category } from '../../models/category';
import { User } from '../../models/user';
import app from '../../server';

const request = supertest(app);

describe('<<<<<<<<<<<<<<<<<< TESTING CATEGORY Handler >>>>>>>>>>>>>>>>>>>>>>> ', () => {
  describe('Testing CATEGORY CRUD API endpoints \n', () => {
    const category: Category = {
      name: 'Income',
      category_type_id: 1
    };
    const category2: Category = {
      name: 'Expenses',
      category_type_id: 1
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

    it('should CREATE = /api/category (POST) create new CATEGORY ', async () => {
      const result = await request.post('/api/category').send(category).set('Authorization', token);
      const result2 = await request.post('/api/category').send(category2).set('Authorization', token);
      expect(result.status).toEqual(201);
      expect(result2.status).toEqual(201);
    });

    it('should INDEX = /api/category (GET) get a list of all CATEGORY ', async () => {
      const result = await request.get('/api/category');
      expect(result.status).toEqual(200);
    });

    it('should SHOW = /api/category/1 (GET) get the CATEGORY with id = 1 ', async () => {
      const result = await request.get('/api/category/1');
      expect(result.status).toEqual(200);
    });

    it('should DELETE = /api/category/1 (DELETE) the CATEGORY with id provided ', async () => {
      const result2 = await request.delete('/api/category/2').set('Authorization', token);
      expect(result2.status).toEqual(200);
    });
  });
});
