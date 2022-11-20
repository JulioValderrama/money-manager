import bcrypt from 'bcrypt';
import client from '../database';

const pepper: string = process.env.BCRYPT_PASSWORD as string;
const saltRounds: string = process.env.SALT_ROUND as string;

export type User = {
  id?: number;
  email: string;
  username: string;
  _password: string;
};

export class UserStore {
  // CREATE()

  async create(user: User) {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING email, username;';

      // We hash the password recieved from the user
      if (!user._password) throw new Error('Password must be provided');
      const hash = bcrypt.hashSync(user._password + pepper, parseInt(saltRounds));
      const result = await connection.query(sql, [user.email, user.username, hash]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create USER. Error: ${err}`);
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
