CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products_orders(
    product_order_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    product_id uuid DEFAULT uuid_generate_v4 (), 
    order_id uuid DEFAULT uuid_generate_v4 (), 
    FOREIGN KEY (product_id) REFERENCES products (product_id),
    FOREIGN KEY (order_id) REFERENCES orders (order_id) ,
    quantity int NOT NULL 
);