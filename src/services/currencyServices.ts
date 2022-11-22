import client from '../database/database';
import { CurrencyStore } from '../models/currency';
import { AccountsStore } from '../models/accounts';
import convertCurrency from '../services/apis/convert-currency';

const accountsStore = new AccountsStore();

export class CurrencyServices {
  async createAllSymbols() {
    try {
      const store = new CurrencyStore();
      const result = await store.createAll();
      console.log(`${result.length} Symbols from external API copied to Database currency table`);
    } catch (err) {
      throw new Error(`Could not fetch Symbols from external API. Error: ${err}`);
    }
  }

  async getCurrencySymbolFromAccount(currencyId: number, accountsId: number) {
    try {
      const connection = await client.connect();
      const sql =
        'SELECT currency.name as symbol, accounts.name FROM currency INNER JOIN accounts ON currency.id = accounts.currency_id WHERE currency.id = ($1) AND accounts.id = ($2);';
      const result = await connection.query(sql, [currencyId, accountsId]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get the Symbol for the currency. Error: ${err}`);
    }
  }

  getDefaultCurrency = async (
    accountId: number,
    currencyDefaultSymbol: string,
    amount: number
  ): Promise<number> => {
    const currencyAccountSymbol = await accountsStore.getCurrencySymbol(accountId);
    const currencyDefaultConverted = await convertCurrency(
      currencyAccountSymbol.name,
      currencyDefaultSymbol,
      amount
    );
    return parseInt(currencyDefaultConverted as unknown as string);
  };
}

export default CurrencyServices;
