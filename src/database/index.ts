import { Pool } from 'pg'
import { POSTGRES_HOST, POSTGRES_PORT, DB, POSTGRES_USER, POSTGRES_PASSWORD } from '../config'

const client = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD as string,
  port: parseInt(POSTGRES_PORT as string),
  database: DB,
  host: POSTGRES_HOST
})
export { client }
