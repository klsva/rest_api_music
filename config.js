import dotenv from 'dotenv';
import fs from 'fs';

const dbConfig = 'db-config.txt';
const configPath = '.env';

//.env
const buffer = fs.readFileSync(configPath);
const config = dotenv.parse(buffer);
for (const key in config) {
  process.env[key] = config[key];
}

//.txt
const bufferDB = fs.readFileSync(dbConfig);
const configDB = dotenv.parse(bufferDB);
for (const key in configDB) {
  process.env[key] = configDB[key];
}

export const PORT = Number(process.env.PORT);
export const { USER_DB } = process.env;
export const { HOST } = process.env;
export const { DATABASE } = process.env;
export const { PASSWORD } = process.env;
export const DB_PORT = Number(process.env.DB_PORT);


