import client from '../database/database';
import AccountsServices from '../services/accountsServices';

const accountsServices = new AccountsServices();

export type Accounts = {
  id?: number;
  name: string;
  amount_account_currency: number;
  amount_default_currency: number;
  included_total: string;
  currency_id: number;
  user_id: number;
};

export class AccountsStore {
  // CREATE()

  async create(accounts: Accounts): Promise<Accounts> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO accounts (name, amount_account_currency, amount_default_currency, included_total, currency_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
      const result = await connection.query(sql, [
        accounts.name,
        accounts.amount_account_currency,
        accounts.amount_default_currency,
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

  async updateTotal(accountsId: number, categoryId: number): Promise<Accounts | undefined> {
    try {
      const connection = await client.connect();
      const sql =
        'UPDATE accounts SET amount_account_currency = ($1), amount_default_currency = ($2) WHERE accounts.id = ($3) RETURNING *;';
      const sumTotal = await accountsServices.getSumPerAccountAndCategory(accountsId, categoryId);
      const result = await connection.query(sql, [sumTotal['account'], sumTotal['default'], categoryId]);
      connection.release();
      console.log(result.rows[0]);
      return result.rows[0];
    } catch (err) {
      console.log(err);
    }
  }

  async getCurrencyId(accountsId: number) {
    try {
      const connection = await client.connect();
      const sql = 'SELECT currency_id FROM accounts WHERE accounts.id = ($1);';
      const result = await connection.query(sql, [accountsId]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get the Currency_id from Accounts. Error: ${err}`);
    }
  }

  async getCurrencySymbol(accountsId: number) {
    try {
      const connection = await client.connect();
      const sql =
        'SELECT currency.name FROM accounts INNER JOIN currency ON accounts.currency_id = currency.id WHERE accounts.id = ($1);';
      const result = await connection.query(sql, [accountsId]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get the Currency_id from Accounts. Error: ${err}`);
    }
  }
}
