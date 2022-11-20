CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    amount_account_currency INTEGER NOT NULL,
    amount_default_currency INTEGER NOT NULL,
    included_total VARCHAR(10) DEFAULT 'yes',
    currency_id INTEGER REFERENCES currency(id) NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL
);