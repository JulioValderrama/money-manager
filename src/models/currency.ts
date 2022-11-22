import client from '../database/database';
import getSymbolsAPI from '../services/apis/currency-symbols';

export type Currency = {
  id?: number;
  name: string;
};

export class CurrencyStore {
  // INDEX()

  async index(): Promise<Currency[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM currency;';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get Currency. Error: ${error}`);
    }
  }

  // SHOW()

  async show(id: string): Promise<Currency> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM currency WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get the Currency. Error: ${error}`);
    }
  }

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

  // DELETE()

  async delete(id: string): Promise<Currency> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM currency WHERE id=($1) RETURNING *;';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error(`Could not DELETE Currency. Error: ${error}`);
    }
  }

  async createAll(): Promise<string[]> {
    try {
      const connection = await client.connect();
      const symbols = await getSymbolsAPI();
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
