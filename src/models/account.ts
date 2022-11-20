import client from '../database/database';

export type Account = {
  id?: number;
  date: string;
  amount_account_currency: number;
  amount_default_currency: number;
  comment: string;
  accounts_id: number;
  category_id: number;
};

export class AccountStore {
  // CREATE()

  async create(account: Account) {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO account (date, amount_account_currency, amount_default_currency, comment, accounts_id, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
      const result = await connection.query(sql, [
        account.date,
        account.amount_account_currency,
        account.amount_default_currency,
        account.comment,
        account.accounts_id,
        account.category_id
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create ACCOUNT. Error: ${err}`);
    }
  }
}
