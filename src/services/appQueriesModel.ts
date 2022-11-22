import client from '../database/database';

export class AppQueries {
  //  To show all the EXPENSES or INCOME from all the accounts included in TOTAL in the HOME PAGE
  // INCLUDED IN TOTAL FUNCTION

  async getBalanceInTotal(categoryTypeName: string): Promise<string[]> {
    try {
      const connection = await client.connect();
      const sql =
        "SELECT category.name, category_type.name as type, SUM(account.amount_default_currency) FROM account INNER JOIN accounts ON account.accounts_id = accounts.id INNER JOIN category ON account.category_id = category.id INNER JOIN category_type ON category.category_type_id = category_type.id WHERE accounts.included_total = 'yes' AND category_type.name = ($1) GROUP BY category.name, category_type.name;";
      const result = await connection.query(sql, [categoryTypeName]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get the Balance in Total Account. Error: ${err}`);
    }
  }

  // To show all the EXPENSES or INCOME from a CATEGORY (Category when clicking and Account provided) FOR THE TOTAL
  // INCLUDED IN TOTAL FUNCTION

  async getBalanceinTotalCategory(categoryName: string, categoryTypeName: string) {
    try {
      const connection = await client.connect();
      const sql =
        "SELECT account.date, accounts.name, category.name, account.amount_account_currency, account.amount_default_currency, account.comment FROM account INNER JOIN accounts ON account.accounts_id = accounts.id INNER JOIN category ON account.category_id = category.id INNER JOIN category_type ON category.category_type_id = category_type.id WHERE category.name = ($1) AND category_type.name = ($2) AND accounts.included_total = 'yes';";
      const result = await connection.query(sql, [categoryName, categoryTypeName]);
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get the Balance for the Account. Error: ${err}`);
    }
  }

  // Get the total Balance per account when name provided - NO TOTAL

  async getTotalBalancePerAccount(accountName: string, category_type_name: string): Promise<string[]> {
    try {
      const connection = await client.connect();
      const sql =
        'SELECT category.name, SUM(account.amount_default_currency) FROM account INNER JOIN accounts ON account.accounts_id = accounts.id INNER JOIN category ON account.category_id = category.id INNER JOIN category_type ON category.category_type_id = category_type.id WHERE accounts.name = ($1) AND category_type.name = ($2) GROUP BY category.name;';
      const result = await connection.query(sql, [accountName, category_type_name]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get the TOTAL Balance for the Account. Error: ${err}`);
    }
  }

  // To show all the EXPENSES or INCOME from a CATEGORY (Category when clicking and Account provided)
  // NO TOTAL
  async getBalancePerAccountCategory(account_name: string, category_type_id: string) {
    try {
      const connection = await client.connect();
      const sql =
        'SELECT account.date, accounts.name, category.name , account.amount_account_currency, account.amount_default_currency, account.comment FROM account INNER JOIN accounts ON account.accounts_id = accounts.id INNER JOIN category ON account.category_id = category.id INNER JOIN category_type ON category.category_type_id = category_type.id WHERE accounts.name = ($1) AND category_type.name =(&2)';
      const result = await connection.query(sql, [account_name, category_type_id]);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get the Balance for the Account. Error: ${err}`);
    }
  }
}
