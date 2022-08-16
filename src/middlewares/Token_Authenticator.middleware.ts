import {checkToken} from "../utils/token_operator"
import { Request,Response,NextFunction } from "express"

const notAuthenticated=(req:Request,res:Response):void=>{
res.status(404).json({"Authentication":"Failed"})
}
const authenticateing=(req:Request,res:Response,next:NextFunction):void=>{
try{
const authenticateHeader=req.header('Authorization')
if(authenticateHeader){
    
    const authenticateToken=authenticateHeader.split(" ")[1]
    const bearerRegexp:RegExp=/Bearer/
    const bearerHeader=authenticateHeader.split(" ")[0]
    if(authenticateToken && bearerRegexp.test(bearerHeader)){
        
        if(checkToken(authenticateToken)){
            next()
        }
        else{
            notAuthenticated(req,res)
        }

    }
    else{
        notAuthenticated(req,res)
    }

}
else{
    notAuthenticated(req,res)
}

}
catch(err){
        notAuthenticated(req,res)
}

}
export {authenticateing}

