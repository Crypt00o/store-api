CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products(
    product_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    product_price VARCHAR (60) NOT NULL , 
    product_name VARCHAR (60) NOT NULL UNIQUE  
);