import app from "../../app"
import supertest from "supertest"
import { client } from '../../database'
const testRequest= supertest(app)
const successCode=200,notAuthenticatedCode=401

let jwtToken:string
let user_id:string
let product_id:string
let order_id:string
const user={
    email:"tester@crypto.com",
    password:"testpassword",
    first_name:"0xCrypt00o",
    last_name:" Backend Developer & CyberSecurity Researcher "
}

const product={
    name:"Raspberry pi 4 Model B",
    price:"45 $"

}
const orderToCreate={
    status:"active",
    user_id:""
}
const orderToUpdate={
    status:"active",
    user_id:""
}
const productOrdered={
    order_id:"",
    product_id:"",
    quantity:0
}

describe("[+] Testing Product Handler ",()=>{
    beforeAll(async()=>{
        //creating user for getting his authenticated token to use on endpoints that,s required authentication token
        let testResponse = await testRequest.post("/users").set('Content-type', 'application/json').send(user)
        jwtToken= testResponse.body.user_token  as string
        user_id=testResponse.body.user.user_id as string
        orderToCreate.user_id=user_id
        orderToUpdate.user_id=user_id
        //creating product for test endpoint /orders/id/product
        testResponse = await testRequest.post("/products").set('Content-type', 'application/json').set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`).send(product);
        product_id=testResponse.body.product.product_id as string
    })

       it("[+] Testing index => [GET] /orders `without jwt token` ",async()=>{
        const testResponse = await testRequest.get("/orders")
        expect(testResponse.statusCode).toBe(notAuthenticatedCode)
       })
       
       it("[+] Testing create => [POST] /orders  [without jwt token] ",async()=>{
        const testResponse = await testRequest.post("/orders").set('Content-type', 'application/json').send(orderToCreate )
        expect(testResponse.statusCode).toBe(notAuthenticatedCode)
       })
       
       it("[+] Testing create => [POST] /orders  [with jwt token] ",async()=>{
        const testResponse = await testRequest.post("/orders").set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`).send(orderToCreate )
        expect(testResponse.statusCode).toBe(successCode)
        expect(testResponse.body.order.order_status).toEqual(orderToCreate.status)
        expect(testResponse.body.order.user_id).toEqual(orderToCreate.user_id)
        order_id=testResponse.body.order.order_id as string
       })
       
       
       it("[+] Testing index => [GET] /orders `without jwt token` ",async()=>{
        const testResponse = await testRequest.get("/orders").set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`)
        expect(testResponse.statusCode).toBe(successCode)
        expect(testResponse.body.orders.length).toBe(1)
       })

       it("[+] Testing show => [GET] /orders/id [without jwt token] ",async()=>{
        const testResponse = await testRequest.get(`/orders/${order_id}`)
        expect(testResponse.statusCode).toBe(notAuthenticatedCode)
       })

       it("[+] Testing show => [GET] /orders/id [with jwt token] ",async()=>{
        const testResponse = await testRequest.get(`/orders/${order_id}`).set('Authorization', `Bearer ${jwtToken}`);
        expect(testResponse.statusCode).toBe(successCode)
        expect(testResponse.body.order.order_status).toEqual(orderToCreate.status)
        expect(testResponse.body.order.user_id).toEqual(orderToCreate.user_id)
       })

       it("[+] Testing update => [PUT] /orders/id  [without jwt token]",async()=>{
        const testResponse = await testRequest.put(`/orders/${order_id}`).send(orderToUpdate)
        expect(testResponse.statusCode).toBe(notAuthenticatedCode)
       })

       it("[+] Testing update => [PUT] /orders/id  [with jwt token]",async()=>{
        const testResponse = await testRequest.put(`/orders/${order_id}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`).send( orderToUpdate)
        expect(testResponse.statusCode).toBe(successCode)
        expect(testResponse.body.order.order_status).toEqual(orderToUpdate.status)
        expect(testResponse.body.order.user_id).toEqual(orderToUpdate.user_id)
       })

       it("[+] Testing delete => [DELETE] /orders/id [without jwt token] ",async()=>{
        const testResponse = await testRequest.delete(`/orders/${order_id}`)
        expect(testResponse.statusCode).toBe(notAuthenticatedCode)
       })

       it("[+] Testing delete => [DELETE] /orders/id [with jwt token] ",async()=>{
        const testResponse = await testRequest.delete(`/orders/${order_id}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`);
        expect(testResponse.statusCode).toBe(successCode)
        expect(testResponse.body.message).toEqual("Order Deleted")   
       })

       describe("[+] Testing Products_Orders",()=>{
       beforeAll(async()=>{
        //creating order for test products_orders
        const testResponse = await testRequest.post("/orders").set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`).send(orderToCreate )
        order_id=testResponse.body.order.order_id as string
        productOrdered.order_id=order_id;
        productOrdered.product_id=product_id;
       })

       it("[+] Testing create Ordered Product => [POST] /orders/id/products  [without jwt token] ",async()=>{
        const testResponse = await testRequest.post(`/orders/${order_id}/products`).set('Content-type', 'application/json').send(productOrdered )
        expect(testResponse.statusCode).toBe(notAuthenticatedCode)
       })
       it("[+] Testing create Ordered Product => [POST] /orders/id/products  [with jwt token] ",async()=>{
        const testResponse = await testRequest.post(`/orders/${order_id}/products`).set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`).send(productOrdered )
        expect(testResponse.statusCode).toBe(successCode)
        expect(testResponse.body["product-ordered"].product_id).toBe(productOrdered.product_id)
        expect(testResponse.body["product-ordered"].order_id).toBe(productOrdered.order_id)
        expect(testResponse.body["product-ordered"].quantity).toBe(productOrdered.quantity)
       })

       afterAll(async()=>{
        const connection = await client.connect()
        await connection.query(`DELETE FROM products_orders;`)
        await connection.query(`DELETE FROM orders;`)
        connection.release()
       })


    })

  
   afterAll(async()=>{
    //Deleting user Created For Testing
     await testRequest.delete(`/users/${user_id}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`);
    //Deleting product Created For Testing
    await testRequest.delete(`/products/${product_id}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`);
    

   })



   


})