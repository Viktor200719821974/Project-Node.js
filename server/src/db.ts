import { Sequelize } from 'sequelize';
import { config } from './config/config';

export const sequelize = new Sequelize(
    config.DB_NAME!,
    config.DB_USER!,
    config.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: config.DB_HOST,
        port: Number(config.DB_PORT),
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
