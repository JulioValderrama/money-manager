import client from '../database';

export type Category = {
  id?: number;
  name: string;
  category_type_id: number;
};

export class CategoryStore {
  // CREATE()

  async create(category: Category) {
    try {
      const connection = await client.connect();
      const sql = 'INSERT INTO category (name, category_type_id) VALUES($1, $2) RETURNING *;';
      const result = await connection.query(sql, [category.name, category.category_type_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create Category. Error: ${err}`);
    }
  }
}
