import client from '../database/database';

export type Category = {
  id?: number;
  name: string;
  category_type_id: number;
};

export class CategoryStore {
  // INDEX()

  async index(): Promise<Category[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM category;';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get category. Error: ${error}`);
    }
  }

  // SHOW()

  async show(id: string): Promise<Category> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM category WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get the Category. Error: ${error}`);
    }
  }

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

  // DELETE()

  async delete(id: string): Promise<Category> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM category WHERE id=($1) RETURNING *;';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error(`Could not DELETE Category. Error: ${error}`);
    }
  }
}
