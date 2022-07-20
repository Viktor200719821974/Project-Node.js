import { NextFunction, Request, Response } from 'express';
import { IRequestExtended, IUser } from '../interfaces';
import { orderService } from '../services/orderService/orderService';
import { ErrorHandler } from '../error/errorHandler';

class OrderController {
    async createOrder(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {
                id, email, name, surname,
            } = req.user as IUser;
            const {
                type, city, street, house, room, comment, department,
            } = req.body;
            if (type !== ('Самовивіз' || "Кур'єр" || 'НоваПошта' || 'УкрПошта')) {
                next(new ErrorHandler("Тип доставки повинен бути такий: Самовивіз, Кур'єр, НоваПошта, УкрПошта"));
            }
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
            );
            res.json(order);
        } catch (e) {
            next();
        }
    }

    async getOrderId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const order = await orderService.getOrderId(+id);
            res.json(order);
        } catch (e) {
            next(e);
        }
    }
}

export const orderController = new OrderController();
