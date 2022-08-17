CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    email VARCHAR (64) NOT NULL UNIQUE ,
    first_name VARCHAR (64) NOT NULL, 
    last_name VARCHAR (64) NOT NULL, 
    password VARCHAR (128) NOT NULL
    );  