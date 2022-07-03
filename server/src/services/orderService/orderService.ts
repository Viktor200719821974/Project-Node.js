// import { NextFunction } from 'express';
import { model } from '../../models/models';
import { orderDeliveryService } from './orderDeliveryService';
import { orderDeviceService } from './orderDeviceService';
import { IOrder } from '../../interfaces';

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
        // next: NextFunction,
    ): Promise<IOrder | null> {
        // @ts-ignore
        const order = await model.OrderUser.create({ userId }).then((data) => data);
        const orderId = order.id;
        const delivery = await orderDeliveryService.createDelivery(
            type,
            city,
            street,
            house,
            room,
            comment,
            department,
            // next,
            orderId,
        ).then((data) => data);
        // @ts-ignore
        const deliveryId = delivery.id;
        const sumaOrder = await orderDeviceService.createOrderDevice(userId, +deliveryId, orderId)
            .then((data) => data);
        await model.OrderUser.update({ sumaOrder }, { where: { id: orderId } });
        return model.OrderUser.findOne({
            where: { id: orderId },
            // eslint-disable-next-line max-len
            // include: [{ model: model.Delivery, as: 'delivery' }, { model: model.OrderDevice, as: 'deviceOrder' }],
        });
    }
}

export const orderService = new OrderService();
