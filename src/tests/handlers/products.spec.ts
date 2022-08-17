import app from "../../app"
import supertest from "supertest"

const testRequest= supertest(app)
const successCode=200,notAuthenticatedCode=401

let jwtToken:string
let user_id:string
let product_id:string
const user={
    email:"tester@crypto.com",
    password:"testpassword",
    first_name:"0xCrypt00o",
    last_name:" Backend Developer & CyberSecurity Researcher "
}

const productToCreate={
    name:"Raspberry pi 4 Model B",
    price:"45 $"

}
const productToUpdate={
    name:"HP EliteBook 840 G3 ",
    price:"1,100 $"
}

describe("[+] Testing Product Handler ",()=>{
    beforeAll(async()=>{
        //creating user for getting his authenticated token to use on endpoints that,s required authentication token
        const testResponse = await testRequest.post("/users").set('Content-type', 'application/json').send(user)
        jwtToken= testResponse.body.user_token  as string
        user_id=testResponse.body.user.user_id as string
    })

   it("[+] Testing index => [GET] /products ",async()=>{
    const testResponse = await testRequest.get("/products")
    expect(testResponse.statusCode).toBe(successCode)
   })

   it("[+] Testing create => [POST] /products  [without jwt token] ",async()=>{
    const testResponse = await testRequest.post("/products").set('Content-type', 'application/json').send(productToCreate )
    expect(testResponse.statusCode).toBe(notAuthenticatedCode)
   })

   it("[+] Testing create => [POST] /products  [with jwt token] ",async()=>{
    const testResponse = await testRequest.post("/products").set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`).send(productToCreate )
    expect(testResponse.statusCode).toBe(successCode)
    expect(testResponse.body.product.product_name).toEqual(productToCreate.name)
    expect(testResponse.body.product.product_price).toEqual(productToCreate.price)
    product_id=testResponse.body.product.product_id as string
   })

   it("[+] Testing show => [GET] /products/id  ",async()=>{
    const testResponse = await testRequest.get(`/products/${product_id}`)
    expect(testResponse.statusCode).toBe(successCode)
    expect(testResponse.body.product.product_name).toEqual(productToCreate.name)
    expect(testResponse.body.product.product_price).toEqual(productToCreate.price)
   })

   it("[+] Testing update => [PUT] /products/id  [without jwt token]",async()=>{
    const testResponse = await testRequest.put(`/products/${product_id}`).send( productToUpdate)
    expect(testResponse.statusCode).toBe(notAuthenticatedCode)
   })

   it("[+] Testing update => [PUT] /products/id  [with jwt token]",async()=>{
    const testResponse = await testRequest.put(`/products/${product_id}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`).send( productToUpdate)
    expect(testResponse.statusCode).toBe(successCode)
    expect(testResponse.body.product.product_name).toEqual(productToUpdate.name)
    expect(testResponse.body.product.product_price).toEqual(productToUpdate.price)
   })

   it("[+] Testing delete => [DELETE] /products/id [without jwt token] ",async()=>{
    const testResponse = await testRequest.delete(`/products/${product_id}`)
    expect(testResponse.statusCode).toBe(notAuthenticatedCode)
   })

   it("[+] Testing delete => [DELETE] /products/id [with jwt token] ",async()=>{
    const testResponse = await testRequest.delete(`/products/${product_id}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`);
    expect(testResponse.statusCode).toBe(successCode)
    expect(testResponse.body.message).toEqual("Product Deleted")   
   })

   afterAll(async()=>{
    //Deleting user Created For Testing
     await testRequest.delete(`/users/${user_id}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`);
   })



   


})