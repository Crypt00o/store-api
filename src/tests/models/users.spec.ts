import { User,UsersModel  } from "../../models/users.model";
const usermodel = new UsersModel()


describe("[+] Testing User Model ",async()=>{
    const userToCreate:User={
        email:"crypto@crypto.com",
        password:"nopassword",
        first_name:"0x",
        last_name:"Crypt00o"
    }
    let createdUser0:User
    let createdUser1:User
    it("[+] Testing Existence of index ",()=>{
        expect(usermodel.index).toBeDefined()
    })
    it("[+] Testing Existence of show ",()=>{
        expect(usermodel.show).toBeDefined()
    })
    it("[+] Testing Existence of create ",()=>{
        expect(usermodel.create).toBeDefined()
    })
    it("[+] Testing Existence of update ",()=>{
        expect(usermodel.update).toBeDefined()
    })
    it("[+] Testing Existence of delete ",()=>{
        expect(usermodel.delete).toBeDefined()
    })

    beforeAll(async()=>{
        //Creating Another User
    createdUser0=await usermodel.create({
        email:"crypto123@crypto.com",
        password:"nopassword",
        first_name:"0x",
        last_name:"Crypt00o"
    })    
    })

    it("[+] Testing Functionality Of Create ",async()=>{
        createdUser1=await usermodel.create(userToCreate)
        expect(createdUser1.email).toEqual(userToCreate.email)
        expect(createdUser1.first_name).toEqual(userToCreate.first_name)
        expect(createdUser1.last_name).toEqual(userToCreate.last_name)
    })
    it("[+] Testing Functionality Of Index ",async()=>{
        const users=await usermodel.index()
        expect(users.length).toBe(2)
        expect(users[0].email).toEqual(createdUser0.email)
        expect(users[0].first_name).toEqual(createdUser0.first_name)
        expect(users[0].last_name).toEqual(createdUser0.last_name)
        expect(users[1].email).toEqual(createdUser1.email)
        expect(users[1].first_name).toEqual(createdUser1.first_name)
        expect(users[1].last_name).toEqual(createdUser1.last_name)
        
    })
    it("[+] Testing Functionality Of Show ",async()=>{
        const user=await usermodel.show(createdUser0.user_id as string)
        expect(user.user_id).toEqual(createdUser0.user_id)
        expect(user.email).toEqual(createdUser0.email)
        expect(user.first_name).toEqual(createdUser0.first_name)
        expect(user.last_name).toEqual(createdUser0.last_name)      
    }) 
    it ("[+] Testing Functionality Of Update ",async()=>{
       const userToUpdate :User ={email:"nomail@crypto.com",user_id:createdUser0.user_id ,password:"new pass",first_name:"new first name",last_name:"last_name"}
        const updatedUser= await usermodel.update(userToUpdate)
        expect(updatedUser.email).toEqual(userToUpdate.email)
        expect(updatedUser.first_name).toEqual(userToUpdate.first_name)
        expect(updatedUser.last_name).toEqual(userToUpdate.last_name)
    })

    it ("[+] Testing Functionality Of Delete ",async()=>{
        await usermodel.delete(createdUser0.user_id  as string)
        const users=await usermodel.index()
        expect(users.length).toBe(1)
    })     

    afterAll(async()=>{ 
    //Deleteing The Another User
      await usermodel.delete(createdUser1.user_id  as string)
    })  
    
})