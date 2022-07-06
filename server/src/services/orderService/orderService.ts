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
        const deviceId = devices.map((c) => c.id);
        const typeId = devices.map((c) => c.typeId);
        const typeDevice = await model.Type.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: { id: typeId },
        }).then((data) => data.map((c) => c.name));
        const brandId = devices.map((c) => c.brandId);
        const brand = await model.Brand.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: { id: brandId },
        }).then((data) => data.map((c) => c.name));
        await model.OrderUser.update({ sumaOrder }, { where: { id: orderId } });
        const devicesOrder = await model.OrderDevice.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: { orderId },
        });
        const image = await model.ImageDeviceAws.findAll({ where: { deviceId } })
            .then((data) => data);
        // const image = imageData.map((c) => c.imageLocation);
        // if (image) {
        //     console.log(image);
        // }
        if (typeId.length > typeDevice.length) {
            typeDevice.push(typeDevice[0]);
        }
        if (brandId.length > brand.length) {
            brand.push(brand[0]);
        }
        const devicesString = JSON.stringify(devicesOrder);
        const devicesJson = JSON.stringify(devices);
        const typeJson = JSON.stringify(typeDevice);
        const brandJson = JSON.stringify(brand);
        const imageJson = JSON.stringify(image);
        await emailService.sendMail(email, 'ORDER_DEVICE', {
            userName: name,
            surname,
            sumaOrder,
            devicesString,
            devicesJson,
            typeJson,
            brandJson,
            imageJson,
        });
        return model.OrderUser.findOne({
            where: { id: orderId },
            // eslint-disable-next-line max-len
            // include: [{ model: model.Delivery, as: 'delivery' }, { model: model.OrderDevice, as: 'deviceOrder' }],
        });
    }
}

export const orderService = new OrderService();
