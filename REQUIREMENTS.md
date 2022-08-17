# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `/products {GET}` 
[+] URL : localhost:3000/products {GET}

- Show `products/:product_id   {GET}` 
[+]  URL : localhost:3000/products/id {GET : {"use as parameter " : [id] } }
- Create `/products/ {POST}` `[jwt token required] `
[+]  URL : localhost:3000/products/ {POST : {"data to post": [price,name] } }
- Update `/products/ {PUT}` `[jwt token required] `
[+] URL : localhost:3000/products/ {PUT : {"data to put": [price,name,id] } }

- Delete `products/:product_id {DELETE}` `[jwt token required] `
[+]  URL : localhost:3000/products/id {DELETE : {"use as parameter " : [id] } }

#### Users
- Index `/users {GET}` `[jwt token required] `
[+] URL : localhost:3000/users {GET}

- Show `users/:user_id   {GET}` `[jwt token required] `
[+]  URL : localhost:3000/user/user_id {GET : {"use as parameter " : [id] } }
- Create `/users/ {POST}` `[jwt token not required] `
[+]  URL : localhost:3000/users/ {POST : {"data to post": [email,first_name,last_name,password] } }
- Update `/users/user_id {PUT}` `[jwt token required] `
[+] URL : localhost:3000/users/id {PUT : {"data to put": [email,first_name,last_name,password] } }

- Delete `users/:user_id {DELETE}` `[jwt token required] `
[+]  URL : localhost:3000/users/id {DELETE : {"use as parameter " : [id] } }

#### Orders
- Index `/orders {GET}` `[jwt token required] `
[+] URL : localhost:3000/orders {GET}

- Show `orders/:order_id   {GET}` `[jwt token required] `
[+]  URL : localhost:3000/orders/id {GET : {"use as parameter " : [id] } }
- Create `/orders/ {POST}` `[jwt token required] `
[+]  URL : localhost:3000/orders/ {POST : {"data to post": [user_id,status] } }
- Update `/orders/ {PUT}` `[jwt token required] `
[+] URL : localhost:3000/orders/ {PUT : {"data to put": [user_id,id,status] } }

- Delete `orders/:order_id {DELETE}` `[jwt token required] `
[+]  URL : localhost:3000/orders/id {DELETE : {"use as parameter " : [id] } }

- Ordered product : `/orders/:id/products {POST}` `[jwt token required] `
[+]  URL : localhost:3000/orders/ , use order id as parameter , {POST : {"data to post": [product_id,quantity] } }
## Data Shapes

#### Product
| Column       | Data Type      |   Constraints  |
| :---         |    :----:      |          ---:  |
| product_id   | uuid_v4        | PRIMARY KEY    |
| product_name | VARCHAR(64)    | NOT NULL       |
| product_price| VARCHAR(255)   | NOT NULL       |

#### User
| Column       | Data Type   |      Constraints     |
| :---         |    :----:   |             ---:     |
| user_id   | uuid_v4        | PRIMARY KEY          |
| email     | VARCHAR(64)    | NOT NULL  UNIQUE     |
| password  | VARCHAR(128)   | NOT NULL             |
| first_name| VARCHAR(32)    | NOT NULL             |
| last_name | VARCHAR(32)    | NOT NULL             |
#### Orders

| Column       | Data Type     |   Constraints                    |
| :---         |    :----:     |          ---:                    |
| order_id     | uuid_v4       | PRIMARY KEY                      |
| order_status | VARCHAR(32)   | NOT NULL                         |
| user_id      | uuid_v4       |NOT NULL REFERENCES users(user_id)|

#### Products_Orders
| Column         | Data Type   |   Constraints                           |
| :---           |    :----:   |          ---:                           |
|product_order_id| uuid_v4     | PRIMARY KEY                             |
| order_id       | uuid_v4     | NOT NULL REFERENCES orders(order_id)    |
| product_id     | uuid_v4     | NOT NULL REFERENCES products(product_id)|
| quantity       | INTEGER     | NOT NULL                                |