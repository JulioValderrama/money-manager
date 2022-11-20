CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category_type_id INTEGER REFERENCES category_type(id) NOT NULL
);