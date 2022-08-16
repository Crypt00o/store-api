# Udacity Storefront Backend Project

##Intoduction 
This Repositoriy Contain A Backend App Build With Express, To Get Started colne This Repositoriy and run ` npm install ` at The Root of The Porject

##Required Technolgies 
- express
- typescript
- bcrypt
- rimraf
- jsonwebtoken
- bcrypt 
- db-migrate
- dot-env
- supertest
- jasmine

## Createing And Connecting To Database
run `psql -U postgres`
#####in psql run :
- `CREATE USER postgres WITH PASSWORD 'postgres';`
-  `CREATE DATABASE store;`
-  `CREATE DATABASE store_test;`
##### to connect to database 
- `\c store`
- `\c store_test`

##Database Migerations
- run `npm run migerate-up` for makeing Database Migeration on Database
- run `npm run migerate-down` for reset Database Migeration on Database

##Environment Variables
#####make a filed call .env in the root of the project and set this env variables inside it
- `POSTGRES_HOST=localhost`
- `POSTGRES_DB=store`
- `POSTGRES_PORT=5432`
- `POSTGRES_USER=postgres`
- `POSTGRES_PASSWORD=postgres`
- `POSTGRES_DB_TEST=store_test`
- `NODE_ENV=dev`
- `JWT_SECRET=secrettoken`
- `BCRYPT_PEPPER=somepepper`
- `SALT_ROUND=10`
- `PORT=3000`

## Some Usefull  Scripts in  Package.json
- `npm run build` to build the project in build directory 
- `npm run test` to test the project with jasmine and Test_Database : store_test
- `npm run dev` to run project in development mode 
- `npm run start ` to build the broject and start it with Production_Database : store
- `npm run test:windows` to test the project with jasmine and Test_Database : store_test on windows 
- `npm run format` to format project with prettier
- `npm run lint` to lint project with eslint

##EndPoints and Api  Explained at [REQUIREMENT.md](REQUIREMENTS.md) file

