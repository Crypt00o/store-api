import {hashSync,compareSync} from "bcrypt"
import {SALT_ROUND,BCRYPT_PEPPER} from "../config"
const hashingPassword=(password:string):string=>{
const password_plus_pepper=password.concat(BCRYPT_PEPPER as string)
return hashSync(password_plus_pepper,parseInt(SALT_ROUND as string))
}

export{hashingPassword}