import { Account, AccountStore } from '../../models/account';

const store = new AccountStore();

describe('------------------------------TESTING Account Model------------------------------', () => {
  describe('Testing ACCOUNT methods exits \n', () => {
    it('should have INDEX() method', () => {
      expect(store.index).toBeDefined();
    });
    it('should have SHOW() method', () => {
      expect(store.show).toBeDefined();
    });
    it('should have CREATE() method', () => {
      expect(store.create).toBeDefined();
    });
    it('should have DELETE() method', () => {
      expect(store.delete).toBeDefined();
    });
  });

  describe('Testing ACCOUNT Model CRUD API with Database \n', () => {
    const account: Account = {
      date: '01/01/2022',
      amount_account_currency: 20,
      amount_default_currency: 25,
      comment: 'This is for a test',
      accounts_id: 5,
      category_id: 1
    };
    const account1: Account = {
      date: '10/01/2022',
      amount_account_currency: 20,
      amount_default_currency: 25,
      comment: 'This is for a test 1',
      accounts_id: 5,
      category_id: 1
    };
    it('Should CREATE() create new ACCOUNT', async () => {
      const result = await store.create(account);
      const result2 = await store.create(account1);
      const prueba = new Date(result.date);
      expect(prueba.toDateString()).toEqual('Sat Jan 01 2022');
      expect(result2.category_id).toEqual(1);
    });
    it('should INDEX() show a list of ACCOUNT', async () => {
      const result = await store.index();
      expect(result.length).toEqual(3);
    });
    it('should SHOW() method get the ACCOUNT with id provided', async () => {
      const result = await store.show('1');
      expect(result.category_id).toEqual(1);
    });
    it('should DELETE() method delete ACCOUNT with id provided', async () => {
      const result = await store.delete('3');
      expect(result.comment).toEqual('This is for a test');
    });
  });
});
