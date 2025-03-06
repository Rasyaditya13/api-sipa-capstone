import {sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: "mySql",
    logging: false,
});

export default sequelize;

