import { DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { IImageDevice, IToken, IUser } from '../interfaces';

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
});

const BasketDevice = sequelize.define('basket_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = sequelize.define('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    // image: { type: DataTypes.STRING, allowNull: false },
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
    rate: { type: DataTypes.INTEGER, allowNull: false },
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
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    accessToken: { type: DataTypes.STRING, unique: true, allowNull: false },
    refreshToken: { type: DataTypes.STRING, unique: true, allowNull: false },
    activateToken: { type: DataTypes.STRING, unique: true, allowNull: false },
    userId: { type: DataTypes.INTEGER },
});

const ImageDevice = sequelize.define('imageDevice', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    imageLocation: { type: DataTypes.STRING },
    deviceId: { type: DataTypes.INTEGER },
}, { createdAt: false, updatedAt: false });

const ImageDeviceAws = sequelize.define<IImageDevice>('imageDeviceAws', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    imageLocation: { type: DataTypes.STRING },
    deviceId: { type: DataTypes.INTEGER },
}, { createdAt: false, updatedAt: false });

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: 'info' });
DeviceInfo.belongsTo(Device);

Device.hasMany(ImageDevice, { as: 'imageDevice' });
ImageDevice.belongsTo(Device);

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
    ImageDevice,
    ImageDeviceAws,
};
