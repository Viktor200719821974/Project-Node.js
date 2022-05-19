import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;
const { SECRET_ACCESS_KEY } = process.env;
const { SECRET_REFRESH_KEY } = process.env;
const { DB_NAME } = process.env;
const { DB_HOST } = process.env;
const { DB_PORT } = process.env;
const { DB_USER } = process.env;
const { DB_PASSWORD } = process.env;
const { USER_SALT_ROUNDS } = process.env;

export const config = {
    PORT: PORT || 5000,
    SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    USER_SALT_ROUNDS,
};
