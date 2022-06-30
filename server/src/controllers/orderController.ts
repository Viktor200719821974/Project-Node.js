import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { orderService } from '../services/orderService';

class OrderController {
    async createOrder(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const { id } = req.user;
            const {
                type, city, street, house, room, comment, department,
            } = req.body;
            const order = await orderService.createOrder(
                id,
                type,
                city,
                street,
                +house,
                +room,
                comment,
                +department,
                next,
            );
            res.json(order);
        } catch (e) {
            next();
        }
    }
}

export const orderController = new OrderController();
