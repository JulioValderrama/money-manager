import bcrypt from 'bcrypt';
import client from '../database/database';

const pepper: string = process.env.BCRYPT_PASSWORD as string;
const saltRounds: string = process.env.SALT_ROUND as string;

export type User = {
  id?: number;
  email: string;
  username: string;
  password: string;
};

export class UserStore {
  // INDEX()

  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM users;';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get USERS. Error: ${error}`);
    }
  }

  // SHOW()

  async show(id: string): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM users WHERE id=${id}`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get the USER. Error: ${error}`);
    }
  }

  // CREATE()

  async create(user: User) {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING email, username;';

      // We hash the password recieved from the user
      if (!user.password) throw new Error('Password must be provided');
      const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds));
      const result = await connection.query(sql, [user.email, user.username, hash]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create USER. Error: ${err}`);
    }
  }

  // DELETE()

  async delete(id: string): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `DELETE FROM users WHERE id=${id} RETURNING id, email, username;`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete the USER. Error: ${err}`);
    }
  }

  // AUTHENTICATE()

  async authenticate(username: string, password: string) {
    const connection = await client.connect();
    const sql = 'SELECT username, password FROM users WHERE username=($1);';
    const result = await connection.query(sql, [username]);
    const user = result.rows[0];
    connection.release();

    if (result.rows.length) {
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      } else {
        throw new Error('The password is invalid, please try again.');
      }
    }
    throw new Error(`The username: ${username} does NOT exist, please try again.`);
  }
}
