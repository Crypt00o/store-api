import express, { Router } from 'express'
import { welcomeMessage, notFound } from '../controllers/main.controller'
import {join} from 'path'
import {userRouter} from "./store-api/users.router"

//Declareing Static Directory for Serving Static Files 

const staticDir:string=join(__dirname,'..','..','static')

//Creatring Router instance

const router: Router = express.Router()

// Useing Static Directory for Serving Static Files 

router.use('/static',express.static(staticDir))

// Welcome Message With / EndPoint

router.get('/', welcomeMessage)

// Useing /users Path as Route
router.use("/users",userRouter) 
// Response With Not Found for any invalid path

router.all('/*', notFound)

export default router

