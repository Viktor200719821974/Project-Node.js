import { DataTypes } from 'sequelize';
import { sequelize } from '../db';
import {
    IDevice, IImageDevice, IToken, ITokenActivate, IUser,
} from '../interfaces';

const User = sequelize.define<IUser>('user', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true,
    },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    phone: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: 'false' },
    is_staff: { type: DataTypes.BOOLEAN, defaultValue: 'false' },
    is_superuser: { type: DataTypes.BOOLEAN, defaultValue: 'false' },
});

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}, { createdAt: false, updatedAt: false });

const BasketDevice = sequelize.define('basket_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    deviceId: { type: DataTypes.INTEGER },
});

const Device = sequelize.define<IDevice>('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    // rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    typeId: { type: DataTypes.INTEGER },
    brandId: { type: DataTypes.INTEGER },
});

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    averageRating: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { createdAt: false, updatedAt: false });

const RatingDevice = sequelize.define('rating_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER },
    rate: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.STRING, allowNull: true },
});

const DeviceInfo = sequelize.define('device_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Token = sequelize.define<IToken>('token', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    accessToken: { type: DataTypes.STRING, unique: true, allowNull: false },
    refreshToken: { type: DataTypes.STRING, unique: true, allowNull: false },
    userId: { type: DataTypes.INTEGER },
});

const TokenActivate = sequelize.define<ITokenActivate>('token_activate', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    activateToken: { type: DataTypes.STRING, unique: true, allowNull: false },
    userId: { type: DataTypes.INTEGER },
});

// const ImageDevice = sequelize.define('imageDevice', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     imageName: { type: DataTypes.STRING },
//     deviceId: { type: DataTypes.INTEGER },
// }, { createdAt: false, updatedAt: false });

const ImageDeviceAws = sequelize.define<IImageDevice>('imageDeviceAws', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    imageLocation: { type: DataTypes.STRING },
    deviceId: { type: DataTypes.INTEGER },
}, { createdAt: false, updatedAt: false });

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

User.hasOne(Token);
TokenActivate.belongsTo(User);

// User.hasOne(Rating);
// Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Rating.hasMany(RatingDevice);
RatingDevice.belongsTo(Rating);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasOne(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: 'info' });
DeviceInfo.belongsTo(Device);

// Device.hasMany(ImageDevice, { as: 'imageDevice' });
// ImageDevice.belongsTo(Device);

Device.hasMany(ImageDeviceAws, { as: 'imageDeviceAws' });
ImageDeviceAws.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export const model = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    DeviceInfo,
    TypeBrand,
    Token,
    // ImageDevice,
    ImageDeviceAws,
    TokenActivate,
    RatingDevice,
};
