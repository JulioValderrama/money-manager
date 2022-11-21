import client from '../database/database';

export type CategoryType = {
  id?: number;
  name: string;
};

export class CategoryTypeStore {
  // INDEX()

  async index(): Promise<CategoryType[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM category_type;';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get Category-type. Error: ${error}`);
    }
  }

  // SHOW()

  async show(id: string): Promise<CategoryType> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM category_type WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get the Category-type. Error: ${error}`);
    }
  }

  // CREATE()

  async create(category_type: string): Promise<CategoryType> {
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

  // DELETE()

  async delete(id: string): Promise<CategoryType> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM category_type WHERE id=($1) RETURNING *;';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error(`Could not DELETE Category_type. Error: ${error}`);
    }
  }
}
