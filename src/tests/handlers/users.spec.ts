import app from "../../app"
import supertest from "supertest"

const testRequest= supertest(app)
const successCode=200,notAuthenticatedCode=401

let jwtToken:string
let user_id:string

const userToCreate={
    email:"tester@crypto.com",
    password:"testpassword",
    first_name:"0xCrypt00o",
    last_name:" Backend Developer & CyberSecurity Researcher "
}
const userToUpdate={
    email:"testupdate@crypto.com",
    password:"testupdate",
    first_name:"test",
    last_name:"update"
}

describe("[+] Testing User Handler ",()=>{

   it("[+] Testing index => [GET] /users `without jwt token` ",async()=>{
    const testResponse = await testRequest.get("/users")
    expect(testResponse.statusCode).toBe(notAuthenticatedCode)
   })

   it("[+] Testing create => [POST] /users  ",async()=>{
    const testResponse = await testRequest.post("/users").set('Content-type', 'application/json').send(userToCreate )

    expect(testResponse.statusCode).toBe(successCode)
    jwtToken= testResponse.body.user_token  as string
    user_id= testResponse.body.user.user_id as string
   })

   it("[+] Testing index => [GET] /users [with jwt token] ",async()=>{
    const testResponse = await testRequest.get("/users").set('Authorization', `Bearer ${jwtToken}`);
    expect(testResponse.statusCode).toBe(successCode)
   })


   it("[+] Testing show => [GET] /users/id [without jwt token] ",async()=>{
    const testResponse = await testRequest.get(`/users/${user_id}`)
    expect(testResponse.statusCode).toBe(notAuthenticatedCode)
   })

   it("[+] Testing show => [GET] /users/id [with jwt token] ",async()=>{
    const testResponse = await testRequest.get(`/users/${user_id}`).set('Authorization', `Bearer ${jwtToken}`);
    expect(testResponse.statusCode).toBe(successCode)
    expect(testResponse.body.user.email).toEqual(userToCreate.email)
    expect(testResponse.body.user.first_name).toEqual(userToCreate.first_name)
    expect(testResponse.body.user.last_name).toEqual(userToCreate.last_name)
   })

   it("[+] Testing update => [PUT] /user/id  [without jwt token]",async()=>{
    const testResponse = await testRequest.put(`/users/${user_id}`).send( userToUpdate)
    expect(testResponse.statusCode).toBe(notAuthenticatedCode)
   })

   it("[+] Testing update => [PUT] /user/id  [with jwt token]",async()=>{
    const testResponse = await testRequest.put(`/users/${user_id}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`).send( userToUpdate)
    expect(testResponse.statusCode).toBe(successCode)
    expect(testResponse.body.user.email).toEqual(userToUpdate.email)
    expect(testResponse.body.user.first_name).toEqual(userToUpdate.first_name)
    expect(testResponse.body.user.last_name).toEqual(userToUpdate.last_name)
   })

   it("[+] Testing delete => [DELETE] /users/id [without jwt token] ",async()=>{
    const testResponse = await testRequest.delete(`/users/${user_id}`)
    expect(testResponse.statusCode).toBe(notAuthenticatedCode)
   })

   it("[+] Testing delete => [DELETE] /users/id [with jwt token] ",async()=>{
    const testResponse = await testRequest.delete(`/users/${user_id}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${jwtToken}`);
    expect(testResponse.statusCode).toBe(successCode)
    expect(testResponse.body.message).toEqual("User Deleted")   
   })



   


})