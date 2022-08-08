import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// import { config } from './config/config';

dotenv.config();

export const sequelize = new Sequelize(
    // process.env.POSTGRES_DB!,
    // process.env.POSTGRES_USER!,
    // process.env.POSTGRES_PASSWORD,
    // {
    //     dialect: 'postgres',
    //     host: 'postgres',
    //     port: Number(process.env.POSTGRES_PORT),
    // },
    'project_node',
    'postgres',
    'root',
    {
        dialect: 'postgres',
        host: 'postgres',
        // port: 5432,
    },
);
