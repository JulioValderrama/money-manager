import { Accounts, AccountsStore } from '../../models/accounts';

const store = new AccountsStore();

describe('------------------------------TESTING Account Model------------------------------', () => {
  describe('Testing ACCOUNTS methods exits \n', () => {
    it('should have CREATE() method', () => {
      expect(store.create).toBeDefined();
    });
  });

  describe('Testing ACCOUNTS Model CRUD API with Database \n', () => {
    const accounts: Accounts = {
      name: 'savings',
      amount_account_currency: 10,
      amount_default_currency: 15,
      included_total: 'yes',
      currency_id: 1,
      user_id: 1
    };
    const accounts1: Accounts = {
      name: 'England',
      amount_account_currency: 110,
      amount_default_currency: 115,
      included_total: 'no',
      currency_id: 2,
      user_id: 1
    };
    it('Should CREATE() create new ACCOUNTS', async () => {
      const result = await store.create(accounts);
      const result2 = await store.create(accounts1);
      expect(result.name).toEqual('savings');
      expect(result2.currency_id).toEqual(2);
    });
  });
});
