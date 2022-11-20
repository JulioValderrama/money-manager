import client from '../database';

export type Accounts = {
  id?: number;
  name: string;
  included_total: string;
  currency_id: number;
  user_id: number;
};

export class AccountsStore {
  // CREATE()

  async create(accounts: Accounts) {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO accounts (name, included_total, currency_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *;';
      const result = await connection.query(sql, [
        accounts.name,
        accounts.included_total,
        accounts.currency_id,
        accounts.user_id
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create ACCOUNTS. Error: ${err}`);
    }
  }
}
