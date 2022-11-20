import client from '../database/database';

export class CategoryTypeStore {
  // CREATE()

  async create(category_type: string) {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO category_type (name) VALUES($1) RETURNING *;';
      const result = await connection.query(sql, [category_type]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create Category_type. Error: ${err}`);
    }
  }
}
