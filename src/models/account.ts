import client from '../database/database';

export type Account = {
  id?: number;
  date: string;
  amount_account_currency: number;
  amount_default_currency?: number;
  comment: string;
  accounts_id: number;
  category_id: number;
};

export class AccountStore {
  // INDEX()

  async index(): Promise<Account[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM account;';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get ACCOUNT. Error: ${error}`);
    }
  }

  // SHOW()

  async show(id: string): Promise<Account> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM account WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get the ACCOUNT. Error: ${error}`);
    }
  }

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

  // DELETE()

  async delete(id: string): Promise<Account> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM account WHERE id=($1) RETURNING *;';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error(`Could not DELETE ACCOUNT. Error: ${error}`);
    }
  }
}
