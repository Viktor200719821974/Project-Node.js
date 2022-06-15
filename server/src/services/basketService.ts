import { NextFunction } from 'express';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';

class BasketService {
    async createBasketDevice(deviceId: number, userId: number, next: NextFunction) {
        const basket = await model.Basket.findOne({ where: { userId } });
        if (!basket) {
            next(new ErrorHandler('Not found', 404));
        }
        const findDevice = await model.Device.findOne({ where: { id: deviceId } });
        if (!findDevice) {
            next(new ErrorHandler('Not found', 404));
        }
        const basketId = basket?.get('id');
        return model.BasketDevice.create({ basketId, deviceId });
    }

    async getBasketDevice(id: number) {
        return model.BasketDevice.findAll({ where: { basketId: id } });
    }
}

export const basketServices = new BasketService();
