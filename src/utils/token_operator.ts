import {sign,verify} from "jsonwebtoken"
import {JWT_SECRET} from "../config"
import { User } from "../models/users.model"

const generateToken=(user:User):string=>{
return sign(user,JWT_SECRET as string)
}

const checkToken=(token:string):string=>{
    return verify(token,JWT_SECRET as string) as string
}
export {generateToken,checkToken}