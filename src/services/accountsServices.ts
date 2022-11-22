import client from '../database/database';

export class AccountsListServices {
  async getSumPerAccountAndCategory(category_id: number, accounts_id: number) {
    try {
      const connection = await client.connect();
      const sql =
        'SELECT accounts.name, SUM(account.amount_account_currency) as account, SUM(account.amount_default_currency) as default FROM account INNER JOIN category ON account.category_id = category.id INNER JOIN accounts ON account.accounts_id = accounts.id WHERE accounts.id =($1) AND category.id =($2) GROUP BY accounts.name;';
      const result = await connection.query(sql, [category_id, accounts_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get the SUM for the account and category provided. Error: ${err}`);
    }
  }
}

export default AccountsListServices;
