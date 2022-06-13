import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { basketService } from '../services/basketService';

class BasketDeviceController {
    async createBasketDevice(req: IRequestExtended, res: Response, next: NextFunction) {
        // @ts-ignore
        const { id } = req.user;
        const { deviceId } = req.body;
        const basket = await basketService.createBasketDevice(deviceId, id, next);
        res.json(basket);
    }

    async getBasketDevice(req: IRequestExtended, res: Response, next: NextFunction) {
        const { id } = req.params;
        const basketDevice = await basketService.getBasketDevice(+id);
        res.json(basketDevice);
    }
}

export const basketController = new BasketDeviceController();
