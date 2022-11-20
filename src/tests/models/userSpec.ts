import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('------------------------------TESTING UserStore Model------------------------------', () => {
  describe('Testing USER methods exits \n', () => {
    it('should have CREATE() method', () => {
      expect(store.create).toBeDefined();
    });
    it('should have AUTHENTICATE() method', () => {
      expect(store.authenticate).toBeDefined();
    });
  });

  describe('Testing USER Model CRUD API with Database \n', () => {
    const user1: User = {
      email: '1@gmail.com',
      username: 'test1',
      _password: '1'
    };

    const user2: User = {
      email: '2@gmail.com',
      username: 'test2',
      _password: '2'
    };

    it('Should CREATE() create new USER', async () => {
      const result = await store.create(user1);
      const result2 = await store.create(user2);
      expect(result.username).toEqual('test1');
      expect(result2.username).toEqual('test2');
    });

    it('should AUTHENTICATE() return USER when log in', async () => {
      const result = await store.authenticate('test1', '1');
      expect(result.username).toEqual('test1');
    });
  });
});
