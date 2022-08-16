import express, { Application} from 'express'
import * as dotenv from 'dotenv'
import bodyParser from "body-parser"
import {myCustomizedLogger} from './middlewares/mylogger.middleware'
import helmet from 'helmet'
import router from './routes/index'
import {client} from "./database"

dotenv.config()

const app: Application = express()

app.use(bodyParser.urlencoded({ extended: false }))

//Testing Database Connection 

const test_db=async ():Promise<void>=>{
  try{
  const connection = await client.connect()
  const sqlQuery="SELECT now();"
  const result = await connection.query(sqlQuery)
  connection.release()
  console.log(`[+] Connected [+] ${result.rows[0].now}`)
  }
  catch(err){
console.log(err)
  }
}
test_db()

////////////
//Secure Http Headers With By Setting Some  Verious Values And Xss Filter

//app.use(helmet())
app.use(helmet({contentSecurityPolicy:false}))

//Logging Http Requests With My Customized MiddleWare

app.use(myCustomizedLogger)

// Useing Routes And Api

app.use(router)

// starting Server

const PORT: string | number = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`[+] Server Listening Now at Port : ${PORT} `)
})

export default app



