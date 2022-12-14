import { client } from '../database'
type Product = {
  product_id?: string
  product_price: string
  product_name: string
}

class ProductsModel {
  //Get ALl Products

  async index(): Promise<Array<Product>> {
    try {
      const connection = await client.connect()
      const sql_query = `SELECT * FROM products ;`
      const query_result = await connection.query(sql_query)
      return query_result.rows
    } catch (err) {
      throw new Error(`Can,t Get Products: ${err} `)
    }
  }

  //Get One Product

  async show(product_id: string): Promise<Product> {
    try {
      const connection = await client.connect()
      const sql_query = `SELECT * FROM products WHERE product_id=$1 ;`
      const query_result = await connection.query(sql_query, [product_id])
      connection.release()
      return query_result.rows[0]
    } catch (err) {
      throw new Error(`Can,t Get Product : ${err} `)
    }
  }

  //Create Product

  async create(product: Product): Promise<Product> {
    try {
      const connection = await client.connect()
      const sql_query = `INSERT INTO products(product_name,product_price) VALUES ($1,$2) RETURNING product_id,product_name,product_price; `
      const query_result = await connection.query(sql_query, [
        product.product_name,
        product.product_price
      ])
      connection.release()
      return query_result.rows[0]
    } catch (err) {
      throw new Error(`Can,t Create Product : ${err} `)
    }
  }

  //Update Product

  async update(product: Product): Promise<Product> {
    try {
      const connection = await client.connect()
      const sql_query = `UPDATE products SET product_name=($1),product_price=($2) WHERE product_id=$3 RETURNING product_id,product_name,product_price ;`
      const query_result = await connection.query(sql_query, [
        product.product_name,
        product.product_price,
        product.product_id
      ])
      connection.release()
      return query_result.rows[0]
    } catch (err) {
      throw new Error(`Can,t Update Product : ${err} `)
    }
  }

  //Delete Product

  async delete(prodcut_id: string): Promise<Product> {
    try {
      const connection = await client.connect()
      const sql_query = `DELETE FROM products WHERE product_id=$1 RETURNING product_id,product_name,product_price;`
      const query_result = await connection.query(sql_query, [prodcut_id])
      connection.release()
      return query_result.rows[0]
    } catch (err) {
      throw new Error(`Can,t Delete Product : ${err} `)
    }
  }
}

export { Product, ProductsModel }
