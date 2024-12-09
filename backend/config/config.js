import dotenv from "dotenv";
dotenv.config({path: `${process.cwd()}/.env`});

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3222;

export const SERVER = {
  SERVER_HOSTNAME,
  SERVER_PORT,
};


