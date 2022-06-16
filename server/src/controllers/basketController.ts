import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { basketServices } from '../services/basketService';

class BasketDeviceController {
    async createBasketDevice(req: IRequestExtended, res: Response, next: NextFunction) {
        // @ts-ignore
        const { id } = req.user;
        const { deviceId } = req.params;
        const basket = await basketServices.createBasketDevice(+deviceId, id, next);
        res.json(basket);
    }

    async getBasketDevice(req: IRequestExtended, res: Response, next: NextFunction) {
        // @ts-ignore
        const { id } = req.user;
        const basketDevice = await basketServices.getBasketDevice(id);
        res.json(basketDevice);
    }

    async deleteDeviceFromBasket(req: IRequestExtended, res: Response, next: NextFunction) {
        const { deviceId } = req.params;
        // @ts-ignore
        const { id } = req.user;
        await basketServices.deleteDeviceFromBasket(+deviceId, id);
        res.json('Ok');
    }
}

export const basketController = new BasketDeviceController();
