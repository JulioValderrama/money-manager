CREATE TABLE IF NOT EXISTS account (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    amount_account_currency INTEGER NOT NULL,
    amount_default_currency INTEGER,
    comment VARCHAR,
    accounts_id INTEGER REFERENCES accounts(id) NOT NULL,
    category_id INTEGER REFERENCES category(id) NOT NULL
);