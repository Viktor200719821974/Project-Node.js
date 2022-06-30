import { NextFunction } from 'express';
import { model } from '../models/models';
import { orderDeliveryService } from './orderDeliveryService';
import { orderDeviceService } from './orderDeviceService';

class OrderService {
    async createOrder(
        userId: number,
        type: string,
        city: string,
        street: string,
        house: number,
        room: number,
        comment: string,
        department: number,
        next: NextFunction,
    ) {
        const order = await model.OrderUser.create({ userId });
        const orderId = order.get('id');
        const delivery = await orderDeliveryService.createDelivery(
            type,
            city,
            street,
            house,
            room,
            comment,
            department,
            orderId,
        );
        const deliveryId = delivery?.get('id');
        await orderDeviceService.createOrderDevice(userId, deliveryId);
        return model.OrderUser.findAll({
            where: { id: orderId },
            include: [{ model: model.Delivery, as: 'delivery' }],
        });
    }
}

export const orderService = new OrderService();
