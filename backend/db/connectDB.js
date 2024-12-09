import { Sequelize } from 'sequelize';
import dotenv from "dotenv"
dotenv.config({path: `${process.cwd()}/.env`});
const DB_NAME = process.env.DB_NAME;
const DB_UNAME = process.env.DB_USERNAME;
const  DB_PWD = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;




export const sequelize = new Sequelize(DB_NAME, DB_UNAME, DB_PWD, {
    host: HOST,      
    dialect: 'postgres',   
    port: DB_PORT,             
    logging: false,       
});

export async function connectDB() {
    await sequelize.authenticate();
    console.log(`Successfully connected to POSTGRES`);
}

