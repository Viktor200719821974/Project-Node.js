require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};
// import { Sequelize } from 'sequelize';
//
// const dbName = 'test-db';
// const dbUser = 'test-user';
// const dbPass = '123123';
// const dbHost = 'some-host';
//
// // new Sequelize(name, user, password, options)
// export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
//     host: dbHost,
//     dialect: 'postgres',
//     port: 3306,
//     dialectOptions: {
//         multipleStatements: true,
//     },
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000,
//     },
//     logging: false,
// });
