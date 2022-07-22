import { NextFunction, Request, Response } from 'express';
import { IRequestExtended, IUser } from '../interfaces';
import { orderService } from '../services/orderService/orderService';
import { ErrorHandler } from '../error/errorHandler';
import { orderDeliveryService } from '../services/orderService/orderDeliveryService';
import { orderDeviceService } from '../services/orderService/orderDeviceService';
import { orderEmailService } from '../services/orderService/orderEmailService';

class OrderController {
    async createOrder(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {
                id, email, name, surname,
            } = req.user as IUser;
            const {
                type, city, street, house, room, comment, department, typePay,
            } = req.body;
            if (type !== 'Самовивіз') {
                if (type !== "Кур'єр") {
                    if (type !== 'НоваПошта') {
                        if (type !== 'УкрПошта') {
                            next(new ErrorHandler("Тип доставки повинен бути такий: Самовивіз, Кур'єр, НоваПошта, УкрПошта"));
                            return;
                        }
                    }
                }
            }
            const orderId = await orderService.createOrder(id, typePay);
            await orderDeliveryService.createDelivery(
                type,
                city,
                street,
                house,
                room,
                comment,
                department,
                orderId,
            ).then((data) => data);
            const deviceOrder = await orderDeviceService.createOrderDevice(+id, orderId)
                .then((data) => data);
            const { sumaOrder, devices } = deviceOrder;
            const deviceId = devices.map((c) => c.id);
            await orderService.updateOrderDevice(sumaOrder, orderId);
            const sendEmail = await orderEmailService.sendOrderEmail(
                devices,
                orderId,
                name,
                surname,
                sumaOrder,
                email,
                deviceId,
                // eslint-disable-next-line no-console
            ).catch(console.error);
            if (!sendEmail) {
                next(new ErrorHandler('Problems is send email', 404));
                return;
            }
            const order = await orderService.deleteBasketDevice(orderId, deviceId);
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
