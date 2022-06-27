import { NextFunction } from 'express';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';

class BasketService {
    async createBasketDevice(deviceId: number, userId: number, next: NextFunction) {
        const basket = await model.Basket.findOne({ where: { userId } });
        if (!basket) {
            next(new ErrorHandler('Basket not found', 404));
        }
        const findDevice = await model.Device.findOne({ where: { id: deviceId } });
        if (!findDevice) {
            next(new ErrorHandler('Device not found', 404));
        }
        const basketId = basket?.get('id');
        return model.BasketDevice.create({ basketId, deviceId });
    }

    async getBasketDevice(userId: number) {
        const basketUser = await model.Basket.findOne({ where: { userId } });
        const basketId = basketUser?.get('id');
        return model.BasketDevice.findAll({ where: { basketId } });
    }

    async deleteDeviceFromBasket(deviceId: number, userId: number) {
        const basketUser = await model.Basket.findOne({ where: { userId } });
        const basketId = basketUser?.get('id');
        return model.BasketDevice.destroy({ where: { deviceId, basketId } });
    }

    // eslint-disable-next-line max-len
    async updateDeviceAmountBasket(id: number, deviceId: number, amount: number, next: NextFunction) {
        const basketUser = await model.Basket.findOne({ where: { userId: id } });
        if (!basketUser) {
            next(new ErrorHandler('Not found basket', 404));
        }
        // @ts-ignore
        const basketId = basketUser.get('id');
        await model.BasketDevice.update({ amount }, { where: { basketId, deviceId } });
        return model.BasketDevice.findOne({ where: { basketId, deviceId } });
    }
}

export const basketServices = new BasketService();
