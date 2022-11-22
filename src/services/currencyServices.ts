import client from '../database/database';
import { CurrencyStore } from '../models/currency';
import { AccountsListStore } from '../models/accountsList';
import convertCurrency from '../services/apis/convert-currency';

const accountsStore = new AccountsListStore();

export class CurrencyServices {
  // Function to RUN in the code the createAll() methond in Currency Model

  async createAllSymbols() {
    try {
      const store = new CurrencyStore();
      const result = await store.createAll();
      console.log(`${result.length} Symbols from external API copied to Database currency table`);
      return result;
    } catch (err) {
      throw new Error(`Could not fetch Symbols from external API. Error: ${err}`);
    }
  }

  async getCurrencySymbolFromAccount(accountsId: number): Promise<string[]> {
    try {
      const connection = await client.connect();
      const sql =
        'SELECT currency.name FROM currency INNER JOIN accounts ON currency.id = accounts.currency_id WHERE accounts.id = ($1);';
      const result = await connection.query(sql, [accountsId]);
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
