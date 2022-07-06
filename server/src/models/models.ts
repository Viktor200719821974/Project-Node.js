import { DataTypes } from 'sequelize';
import { sequelize } from '../db';
import {
    IBasket,
    IBasketDevice, IBrand, IDelivery,
    IDevice, IImageDevice, IOrder, IOrderDevice, IToken, ITokenActivate, IType, IUser,
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

const Basket = sequelize.define<IBasket>('basket', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    userId: { type: DataTypes.INTEGER },
}, { createdAt: false, updatedAt: false });

const BasketDevice = sequelize.define<IBasketDevice>('basket_device', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    deviceId: { type: DataTypes.INTEGER },
    basketId: { type: DataTypes.INTEGER },
    amount: { type: DataTypes.INTEGER, defaultValue: 1 },
});

const Device = sequelize.define<IDevice>('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    width: { type: DataTypes.INTEGER, allowNull: false },
    height: { type: DataTypes.INTEGER, allowNull: false },
    depth: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    typeId: { type: DataTypes.INTEGER },
    brandId: { type: DataTypes.INTEGER },
});

const Type = sequelize.define<IType>('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define<IBrand>('brand', {
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

const OrderUser = sequelize.define<IOrder>('order', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true,
    },
    sumaOrder: { type: DataTypes.INTEGER, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
});

const Delivery = sequelize.define<IDelivery>('delivery', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true,
    },
    type: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: true },
    street: { type: DataTypes.STRING, allowNull: true },
    house: { type: DataTypes.INTEGER, allowNull: true },
    room: { type: DataTypes.INTEGER, allowNull: true },
    department: { type: DataTypes.INTEGER, allowNull: true },
    comment: { type: DataTypes.STRING, allowNull: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
});

const OrderDevice = sequelize.define<IOrderDevice>('order_device', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true,
    },
    deviceId: { type: DataTypes.INTEGER, allowNull: false },
    amountDevice: { type: DataTypes.INTEGER, allowNull: false },
    priceDevice: { type: DataTypes.INTEGER, allowNull: false },
    sumPriceDevice: { type: DataTypes.INTEGER, allowNull: false },
    deliveryId: { type: DataTypes.INTEGER, allowNull: false },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(OrderUser);
OrderUser.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

User.hasOne(Token);
TokenActivate.belongsTo(User);

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

OrderUser.hasOne(Delivery);
Delivery.belongsTo(OrderUser);

OrderUser.hasMany(OrderDevice);
OrderDevice.belongsTo(OrderUser);

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
    OrderUser,
    Delivery,
    OrderDevice,
};
