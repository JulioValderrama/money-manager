import client from '../database';

export type Currency = {
  id?: number;
  name: string;
};

export class CurrencyStore {
  // CREATE()

  async create(currency: Currency) {
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
}
