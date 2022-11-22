import client from '../database/database';

export class AppQueries {
  //  To show all the EXPENSES or INCOME from all the accounts included in TOTAL in the HOME PAGE

  async getBalanceInTotal(categoryTypeName: string) {
    try {
      console.log(categoryTypeName);
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

  async getBalancePerAccount(accountName: string) {
    try {
      const connection = await client.connect();
      const sql =
        'SELECT category.name, SUM(account.amount_default_currency) FROM account INNER JOIN accounts ON account.accounts_id = accounts.id INNER JOIN category ON account.category_id = category.id INNER JOIN category_type ON category.category_type_id = category_type.id WHERE accounts.name = ($1) GROUP BY category.name;';
      const result = await connection.query(sql, [accountName]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get the Balance for the Account. Error: ${err}`);
    }
  }

  // To show all the EXPENSES or INCOME from a CATEGORY (Category when clicking and Account provided)

  //async getBalancePerCategoryAccount(categoryName: string, )

  //  To show all the ACCOUNTS in the Accounts page from the menu
  //  - INDEX GET =
}
