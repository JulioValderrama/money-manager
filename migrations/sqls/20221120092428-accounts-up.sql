CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    included_total VARCHAR(10) DEFAULT 'yes',
    currency_id INTEGER REFERENCES currency(id) NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL
);