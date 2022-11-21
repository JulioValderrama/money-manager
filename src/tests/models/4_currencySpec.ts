import { Currency, CurrencyStore } from '../../models/currency';

const store = new CurrencyStore();

describe('------------------------------TESTING Currency Model------------------------------', () => {
  describe('Testing CURRENCY methods exits \n', () => {
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

  describe('Testing CURRENCY Model CRUD API with Database \n', () => {
    const currency: Currency = {
      name: 'CACA'
    };
    const currency1: Currency = {
      name: 'CAC'
    };
    it('Should CREATE() create new CURRENCY', async () => {
      const result = await store.create(currency);
      const result2 = await store.create(currency1);
      expect(result.name).toEqual('CACA');
      expect(result2.name).toEqual('CAC');
    });
    it('should INDEX() show a list of CURRENCY', async () => {
      const result = await store.index();
      expect(result.length).toEqual(3);
    });
    it('should SHOW() method get the CURRENCY with id provided', async () => {
      const result = await store.show('1');
      expect(result.name).toEqual('GBP');
    });
    // it('Should CREATEALL() fetch data from API and create symbols in Database', async () => {
    //   const result = await store.createAll();
    //   expect(result.length).toBeGreaterThan(100);
    // });
    it('should DELETE() method delete CURRENCY with id provided', async () => {
      const result = await store.delete('3');
      expect(result.name).toEqual('CACA');
    });
  });
});
