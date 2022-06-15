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
        const { id } = req.params;
        const basketDevice = await basketServices.getBasketDevice(+id);
        res.json(basketDevice);
    }
}

export const basketController = new BasketDeviceController();