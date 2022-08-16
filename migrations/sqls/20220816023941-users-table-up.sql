/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    email VARCHAR (60) NOT NULL UNIQUE ,
    first_name VARCHAR (60) NOT NULL, 
    last_name VARCHAR (60) NOT NULL, 
    password VARCHAR (100) NOT NULL
    );  