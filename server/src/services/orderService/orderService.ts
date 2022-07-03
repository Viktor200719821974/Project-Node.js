// import { NextFunction } from 'express';
import { model } from '../../models/models';
import { orderDeliveryService } from './orderDeliveryService';
import { orderDeviceService } from './orderDeviceService';
import { IOrder } from '../../interfaces';
import { emailService } from '../emailService';

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
        email: string,
        name: string,
        surname: string,
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
        const deviceOrder = await orderDeviceService.createOrderDevice(userId, +deliveryId, orderId)
            .then((data) => data);
        const { sumaOrder, devices } = deviceOrder;
        await model.OrderUser.update({ sumaOrder }, { where: { id: orderId } });
        const devicesOrder = await model.OrderDevice.findAll({ where: { orderId } });
        const devicesString = JSON.stringify(devicesOrder);
        const devicesJson = JSON.stringify(devices);
        await emailService.sendMail(email, 'ORDER_DEVICE', {
            userName: name, surname, sumaOrder, devicesString, devicesJson,
        });
        return model.OrderUser.findOne({
            where: { id: orderId },
            // eslint-disable-next-line max-len
            // include: [{ model: model.Delivery, as: 'delivery' }, { model: model.OrderDevice, as: 'deviceOrder' }],
        });
    }
}

export const orderService = new OrderService();
