import client from '../database/database';
import AccountsListServices from '../services/accountsServices';

const accountsListServices = new AccountsListServices();

export type AccountsList = {
  id?: number;
  name: string;
  amount_account_currency: number;
  amount_default_currency: number;
  included_total: string;
  currency_id: number;
  user_id: number;
};

export class AccountsListStore {
  // INDEX()

  async index(): Promise<AccountsList[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM accounts;';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get ACCOUNTS. Error: ${error}`);
    }
  }

  // SHOW()

  async show(id: string): Promise<AccountsList> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM accounts WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get the ACCOUNTS. Error: ${error}`);
    }
  }

  // CREATE()

  async create(accounts: AccountsList): Promise<AccountsList> {
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

  // DELETE()

  async delete(id: string): Promise<AccountsList> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM accounts WHERE id=($1) RETURNING *;';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error(`Could not DELETE ACCOUNTS. Error: ${error}`);
    }
  }

  // Other METHODS

  // UpdateTotal()

  async updateTotal(accountsId: number, categoryId: number): Promise<AccountsList | undefined> {
    try {
      const connection = await client.connect();
      const sql =
        'UPDATE accounts SET amount_account_currency = ($1), amount_default_currency = ($2) WHERE accounts.id = ($3) RETURNING *;';
      const sumTotal = await accountsListServices.getSumPerAccountAndCategory(accountsId, categoryId);
      const result = await connection.query(sql, [sumTotal['account'], sumTotal['default'], categoryId]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update the Total amount in Accounts. Error ${err}`);
    }
  }

  // getCurrencyId()

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

  // getCurrencySymbol()

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
