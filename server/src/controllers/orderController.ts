import { NextFunction, Response } from 'express';
import { IRequestExtended, IUser } from '../interfaces';
import { orderService } from '../services/orderService/orderService';

class OrderController {
    async createOrder(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {
                id, email, name, surname,
            } = req.user as IUser;
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
                email,
                name,
                surname,
                // next,
            ).then((data) => data);
            res.json(order);
        } catch (e) {
            next();
        }
    }
}

export const orderController = new OrderController();
