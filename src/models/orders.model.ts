import{client}  from "../database"
type Order ={
order_id?:string,
order_status:string,
user_id:string
}
type OrderedProduct = {
    order_id:string,product_id:string,quantity:number
}

class OrdersModel{

//Get All Orders

    async index():Promise<Array<Order>>{
        try{
            const connection = await client.connect()
            const sql_query=`SELECT * FROM orders ;`
            const query_result= await connection.query(sql_query)
            return query_result.rows
        }
        catch(err){
            throw new Error(`Can,t Get Orders: ${err} `)
        }
    }

//Get One Order
   
    async show(order_id:string):Promise<Order>{
        try{
            const connection = await client.connect()
            const sql_query=`SELECT * FROM orders WHERE order_id=$1 ;`
            const query_result= await connection.query(sql_query,[order_id])
            connection.release()
            return query_result.rows[0]
        }
        catch(err){
            throw new Error(`Can,t Get Order : ${err} `)
        }
    }

//Create  Order

    async create(order:Order): Promise<Order>{
        try{
            const connection = await client.connect()
            const sql_query=`INSERT INTO orders(order_status,user_id) VALUES ($1,$2) RETURNING order_id,order_status,user_id ; `
            const query_result= await connection.query(sql_query,[order.order_status,order.user_id])
            connection.release()
            return query_result.rows[0]
        }
        catch(err){
            throw new Error(`Can,t Create Order : ${err} `)
        }
    }

//Update Order

    async update(order:Order):Promise<Order>{
        try{
            const connection = await client.connect()
            const sql_query=`UPDATE orders SET order_status=($1) WHERE order_id=$2 RETURNING order_id,order_status,user_id ;`
            const query_result= await connection.query(sql_query,[order.order_status,order.order_id])
            connection.release()
            return query_result.rows[0]
        }
        catch(err){
            throw new Error(`Can,t Update Order: ${err} `)
        }

    }

//Delete Order

    async delete(order_id:string):Promise<Order>{
        try{
            const connection = await client.connect()
            const sql_query=`DELETE FROM orders WHERE order_id=$1 RETURNING order_id,order_status,user_id;`
            const query_result= await connection.query(sql_query,[order_id])
            connection.release()
            return query_result.rows[0]
        }
        catch(err){
            throw new Error(`Can,t Delete Order : ${err} `)
        }
    }

//Insert Ordered Product Into products_orders Table

    async insertOrderedProduct(orderedProduct:OrderedProduct):Promise<Order>{
        try{
            const connection = await client.connect()
            const sql_query=`INSERT INTO products_orders(order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING order_id,product_id,quantity; `
            const query_result= await connection.query(sql_query,[orderedProduct.order_id,orderedProduct.product_id,orderedProduct.quantity])
            connection.release()
            return query_result.rows[0]
        }
        catch(err){
            throw new Error(`Can,t Create Ordered Product : ${err} `)
        }
    }

}

export {Order,OrderedProduct,OrdersModel}