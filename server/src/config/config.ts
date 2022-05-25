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
// @ts-ignore
const { NO_REPLY_EMAIL } = process.env.NO_REPLY_EMAIL;
// @ts-ignore
const { NO_REPLY_EMAIL_PASSWORD } = process.env.NO_REPLY_EMAIL_PASSWORD;
// @ts-ignore
const { S3_NAME } = process.env.S3_NAME;
// @ts-ignore
const { S3_REGION } = process.env.S3_REGION;
// @ts-ignore
const { S3_ACCESS_KEY } = process.env.S3_ACCESS_KEY;
// @ts-ignore
const { S3_SECRET_KEY } = process.env.S3_SECRET_KEY;

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
    NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD,
    S3_NAME,
    S3_REGION,
    S3_ACCESS_KEY,
    S3_SECRET_KEY,
};
