import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY,
    SECRET_ACTIVATE_KEY: process.env.SECRET_ACTIVATE_KEY,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    USER_SALT_ROUNDS: process.env.USER_SALT_ROUNDS,
    FRONTEND_URL: process.env.FRONTEND_URL,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    REDIRECT_URL_EMAIL: process.env.REDIRECT_URL_EMAIL,
    CLIENT_ID_EMAIL: process.env.CLIENT_ID_EMAIL,
    CLIENT_SECRET_KEY_EMAIL: process.env.CLIENT_SECRET_KEY_EMAIL,
    REFRESH_TOKEN_EMAIL: process.env.REFRESH_TOKEN_EMAIL,
    ACCESS_TOKEN_EMAIL: process.env.ACCESS_TOKEN_EMAIL,
    S3_NAME: process.env.S3_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
};
