CREATE TABLE IF NOT EXISTS account (
    id SERIAL PRIMARY KEY,
    accounts_id INTEGER REFERENCES accounts(id) NOT NULL,
    date DATE NOT NULL,
    amount INTEGER NOT NULL,
    category_id INTEGER REFERENCES category(id) NOT NULL,
    comment VARCHAR
);