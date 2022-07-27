import { Sequelize } from 'sequelize';
import { constants } from './constants';
// import { config } from './config/config';

export const sequelize = new Sequelize(
    constants.POSTGRES_DB,
    constants.POSTGRES_USER,
    constants.POSTGRES_PASSWORD,
    {
        dialect: 'postgres',
        host: constants.POSTGRES_HOST,
        port: constants.POSTGRES_PORT,
    },
);
// export function DeviceFactory(newSequelize: Sequelize): DeviceNewStatic {
//     return <DeviceNewStatic>sequelize.define('device', {
//         id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//         name: { type: DataTypes.STRING, unique: true, allowNull: false },
//         price: { type: DataTypes.INTEGER, allowNull: false },
//         rating: { type: DataTypes.INTEGER, defaultValue: 0 },
//         // image: { type: DataTypes.STRING, allowNull: false },
//     });
// }
