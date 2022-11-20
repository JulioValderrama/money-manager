import { Account, AccountStore } from '../../models/account';

const store = new AccountStore();

describe('------------------------------TESTING Account Model------------------------------', () => {
  describe('Testing ACCOUNT methods exits \n', () => {
    it('should have CREATE() method', () => {
      expect(store.create).toBeDefined();
    });
  });

  describe('Testing ACCOUNT Model CRUD API with Database \n', () => {
    const account: Account = {
      date: '01/01/2022',
      amount_account_currency: 20,
      amount_default_currency: 25,
      comment: 'This is for a test',
      accounts_id: 1,
      category_id: 1
    };
    const account1: Account = {
      date: '10/01/2022',
      amount_account_currency: 20,
      amount_default_currency: 25,
      comment: 'This is for a test 1',
      accounts_id: 2,
      category_id: 2
    };
    it('Should CREATE() create new ACCOUNT', async () => {
      const result = await store.create(account);
      const result2 = await store.create(account1);
      const prueba = new Date(result.date);
      expect(prueba.toDateString()).toEqual('Sat Jan 01 2022');
      expect(result2.category_id).toEqual(2);
    });
  });
});
