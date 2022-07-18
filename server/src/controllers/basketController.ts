import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { basketServices } from '../services/basketService';

class BasketDeviceController {
    async createBasketDevice(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const { id } = req.user;
            const { deviceId } = req.params;
            const basket = await basketServices.createBasketDevice(+deviceId, +id, next);
            res.json(basket);
        } catch (e) {
            next(e);
        }
    }

    async getBasketDevice(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const { id } = req.user;
            const basketDevice = await basketServices.getBasketDevice(id);
            res.json(basketDevice);
        } catch (e) {
            next(e);
        }
    }

    async deleteDeviceFromBasket(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { deviceId } = req.params;
            // @ts-ignore
            const { id } = req.user;
            await basketServices.deleteDeviceFromBasket(+deviceId, id);
            res.json('Ok');
        } catch (e) {
            next(e);
        }
    }

    async updateAmountDeviceBasket(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const { id } = req.user;
            const { amount } = req.body;
            const { deviceId } = req.params;
            // eslint-disable-next-line max-len
            const deviceBasket = await basketServices.updateDeviceAmountBasket(id, +deviceId, +amount, next);
            res.json(deviceBasket);
        } catch (e) {
            next(e);
        }
    }
}

export const basketController = new BasketDeviceController();
