import client from '../database/database';
import currencySymbols from '../services/apis/currency-symbols';

export type Currency = {
  id?: number;
  name: string;
};

export class CurrencyStore {
  // CREATE()

  async create(currency: Currency): Promise<Currency> {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO currency (name) VALUES($1) RETURNING *;';
      const result = await connection.query(sql, [currency.name]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create Currency. Error: ${err}`);
    }
  }

  async createAll(): Promise<string[]> {
    try {
      const connection = await client.connect();
      const symbols = await currencySymbols();
      const symbolsList = [];
      for (let i = 0; i < symbols.length; i++) {
        connection.query(`INSERT INTO currency (name) VALUES ('${symbols[i]}')`);
        symbolsList.push(symbols[i]);
      }
      connection.release();
      return symbolsList;
    } catch (err) {
      throw new Error(`Could not create all the symbols from external API. Error: ${err}`);
    }
  }
}
