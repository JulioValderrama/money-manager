import { Accounts, AccountsStore } from '../../models/accounts';

const store = new AccountsStore();

describe('------------------------------TESTING Account Model------------------------------', () => {
  describe('Testing ACCOUNTS methods exits \n', () => {
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

  describe('Testing ACCOUNTS Model CRUD API with Database \n', () => {
    const accounts: Accounts = {
      name: 'savings',
      amount_account_currency: 10,
      amount_default_currency: 15,
      included_total: 'yes',
      currency_id: 5,
      user_id: 3
    };
    const accounts1: Accounts = {
      name: 'England',
      amount_account_currency: 110,
      amount_default_currency: 115,
      included_total: 'no',
      currency_id: 5,
      user_id: 3
    };
    it('Should CREATE() create new ACCOUNTS', async () => {
      const result = await store.create(accounts);
      const result2 = await store.create(accounts1);
      expect(result.name).toEqual('savings');
      expect(result2.currency_id).toEqual(5);
    });
    it('should INDEX() show a list of ACCOUNTS', async () => {
      const result = await store.index();
      expect(result.length).toEqual(3);
    });
    it('should SHOW() method get the ACCOUNTS with id provided', async () => {
      const result = await store.show('2');
      expect(result.name).toEqual('test1');
    });
    it('should DELETE() method delete ACCOUNTS with id provided', async () => {
      const result = await store.delete('2');
      expect(result.name).toEqual('test1');
    });
  });
});
