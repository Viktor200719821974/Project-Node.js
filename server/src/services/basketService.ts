import { NextFunction } from 'express';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';
import { IBasketDevice } from '../interfaces';

class BasketService {
    async createBasketDevice(deviceId: number, userId: number, next: NextFunction)
        : Promise<IBasketDevice> {
        const basket = await model.Basket.findOne({ where: { userId } });
        if (!basket) {
            next(new ErrorHandler('Basket not found', 404));
        }
        const basketId = basket?.id;
        Number(basketId);
        // const findDevice = await model.BasketDevice.findOne({ where: { deviceId, basketId } });
        // if (findDevice) {
        //     next(new ErrorHandler('The device is already in the basket', 404));
        // }
        // @ts-ignore
        return model.BasketDevice.create({ basketId, deviceId });
    }

    async getBasketDevice(userId: number): Promise<IBasketDevice[]> {
        const basketUser = await model.Basket.findOne({ where: { userId } });
        const basketId = basketUser?.id;
        return model.BasketDevice.findAll({ where: { basketId } });
    }

    async deleteDeviceFromBasket(deviceId: number, userId: number): Promise<number> {
        const basketUser = await model.Basket.findOne({ where: { userId } });
        const basketId = basketUser?.id;
        return model.BasketDevice.destroy({ where: { deviceId, basketId } });
    }

    // eslint-disable-next-line max-len
    async updateDeviceAmountBasket(id: number, deviceId: number, amount: number, next: NextFunction)
        : Promise<IBasketDevice | null> {
        const basketUser = await model.Basket.findOne({ where: { userId: id } });
        if (!basketUser) {
            next(new ErrorHandler('Not found basket', 404));
        }
        const basketId = basketUser?.id;
        // eslint-disable-next-line max-len
        await model.BasketDevice.update({ amount }, { where: { basketId, deviceId } });
        return model.BasketDevice.findOne({ where: { basketId, deviceId } });
    }
}

export const basketServices = new BasketService();
