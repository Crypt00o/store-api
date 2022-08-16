import{client}  from "../database"
import {hashingPassword} from "../utils/hashing"


// Create Type For User

type User = {
    user_id?:string,
    email:string,
    password?:string,
    first_name:string,
    last_name:string
}

//User Model

class UsersModel {
// Getting Users
    async index():Promise<Array<User> > {
try {
    const connection = await client.connect()
    const sql_query=`SELECT user_id,email,first_name,last_name FROM users ;`
    const query_result= await connection.query(sql_query)
    return query_result.rows
}
catch(err){
    throw new Error(`Can,t Get Users : ${err} `)
}
}

//Get One User
async show(user_id:string): Promise<User>{
    try{
        const connection = await client.connect()
        const sql_query=`SELECT user_id,email,first_name,last_name FROM users WHERE user_id=$1 ;`
        const queryresult= await connection.query(sql_query,[user_id])
        connection.release()
        return queryresult.rows[0]
    }
    catch(err){
        throw new Error(`Can,t Get User : ${err} `)
    }
}

//Create User

async create(user:User): Promise<User>{
    try{
        const connection = await client.connect()
        const sql_query=`INSERT INTO users(email,first_name,last_name,password) VALUES ($1,$2,$3,$4) RETURNING user_id,email,first_name,last_name; `
        const queryresult= await connection.query(sql_query,[user.email,user.first_name,user.last_name,hashingPassword(user.password as string)])
        connection.release()
        return queryresult.rows[0]
    }
    catch(err){
        throw new Error(`Can,t create User : ${err} `)
    }
}

//Update User
async update(user:User):Promise<User>{
    try{
        const connection = await client.connect()
        const sql_query=`UPDATE users SET email=($1),first_name=($2),last_name=($3),password=($4) WHERE user_id=$5 RETURNING user_id,email,first_name,last_name ;`
        const queryresult= await connection.query(sql_query,[user.email,user.first_name,user.last_name,hashingPassword(user.password as string),user.user_id])
        connection.release()
        return queryresult.rows[0]
    }
    catch(err){
        throw new Error(`Can,t update User : ${err} `)
    }
}

//Delete User
async delete(user_id:string):Promise<User>{
    try{
        const connection = await client.connect()
        const sql_query=`DELETE FROM users WHERE user_id=$1 RETURNING user_id,email,first_name,last_name;`
        const queryresult= await connection.query(sql_query,[user_id])
        connection.release()
        return queryresult.rows[0]
    }
    catch(err){
        throw new Error(`Can,t Delete User : ${err} `)
    }
}

}

export{User,UsersModel}


