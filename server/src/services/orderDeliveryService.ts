import { model } from '../models/models';

class OrderDeliveryService {
    async createDelivery(
        type: string,
        city: string,
        street: string,
        house: number,
        room: number,
        comment: string,
        department: number,
        orderId: any,
    ) {
        let delivery;
        if (type === 'Самовивіз') {
            delivery = await model.Delivery.create(
                {
                    type, orderId,
                },
            );
        }
        if (type === 'Курєр') {
            delivery = await model.Delivery.create(
                {
                    type, city, street, house, room, comment, orderId,
                },
            );
        }
        if (type === 'Нова Пошта') {
            delivery = await model.Delivery.create(
                {
                    type, city, department, orderId,
                },
            );
        }
        if (type === 'УкрПошта') {
            delivery = await model.Delivery.create(
                {
                    type, city, department, orderId,
                },
            );
        }
        return delivery;
    }
}

export const orderDeliveryService = new OrderDeliveryService();
