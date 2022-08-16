import { Router } from "express";
import {authenticateing} from "../../middlewares/Token_Authenticator.middleware"
import {index,create,show,update,_delete} from "../../handlers/users.handler"
const userRouter=Router()
userRouter.get("/",authenticateing,index)
userRouter.get("/:id",authenticateing,show)
userRouter.post("/",create)
userRouter.put("/:id",authenticateing,update)
userRouter.delete("/:id",authenticateing,_delete)
export {userRouter}