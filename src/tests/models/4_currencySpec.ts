import { Currency, CurrencyStore } from '../../models/currency';

const store = new CurrencyStore();

describe('------------------------------TESTING Currency Model------------------------------', () => {
  describe('Testing CURRENCY methods exits \n', () => {
    it('should have CREATE() method', () => {
      expect(store.create).toBeDefined();
    });
  });

  describe('Testing CURRENCY Model CRUD API with Database \n', () => {
    const currency: Currency = {
      name: 'EUR'
    };
    const currency1: Currency = {
      name: 'GBP'
    };
    it('Should CREATE() create new CATEGORY', async () => {
      const result = await store.create(currency);
      const result2 = await store.create(currency1);
      expect(result.name).toEqual('EUR');
      expect(result2.name).toEqual('GBP');
    });
  });
});
