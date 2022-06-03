import { Sequelize } from "sequelize";
import { USER_DB, DATABASE, PASSWORD, HOST, DB_PORT } from '../../config.js';

const db = new Sequelize(
  DATABASE, USER_DB, PASSWORD,
  {
    dialect: 'postgres',
    host: HOST,
    port: DB_PORT
  }
)

export default db;