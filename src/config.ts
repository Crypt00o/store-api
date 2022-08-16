import {config} from "dotenv"
import {env} from "process"
config()

const {NODE_ENV}=env

const{ POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    BCRYPT_PEPPER,
    SALT_ROUND,
    JWT_SECRET
}=env


let DB:string
if(NODE_ENV=== "test"){
DB=POSTGRES_DB_TEST as string
}
else {
    DB=POSTGRES_DB as string
}

export {
    POSTGRES_HOST,
    POSTGRES_PORT,
    DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    BCRYPT_PEPPER,
    SALT_ROUND,
    JWT_SECRET
}