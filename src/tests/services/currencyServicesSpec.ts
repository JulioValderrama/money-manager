import CurrencyServices from '../../services/currencyServices';

const currencyServices = new CurrencyServices();

describe('@@@@@@@@ TESTING CurrencyServices @@@@@@@ \n ', () => {
  //   it('should createAllSymbols fetch from API and store it in the Database', async () => {
  //     const result = await currencyServices.createAllSymbols();
  //     expect(result.length).toBeGreaterThan(150);
  //   });
  it('should fetch the Symbol from an accounts with id provided', async () => {
    const result = await currencyServices.getCurrencySymbolFromAccount(2);
    expect(result).toEqual({ name: 'GBP' } as unknown as string);
  });

  it('should get the amount converted into the default CURRENCY', async () => {
    const result = await currencyServices.getDefaultCurrency(2, 'EUR', 10);
    expect(result).toBeGreaterThan(10);
  });
});
