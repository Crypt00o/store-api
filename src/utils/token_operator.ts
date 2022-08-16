import {sign,verify,JwtPayload} from "jsonwebtoken"
import {JWT_SECRET} from "../config"
import { User } from "../models/users.model"

const generateToken=(user:User):string=>{
return sign(user,JWT_SECRET as string)
}

const checkToken=(token:string):string |JwtPayload =>{
    return verify(token,JWT_SECRET as string)
}
export {generateToken,checkToken}