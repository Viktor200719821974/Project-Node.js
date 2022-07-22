import { model } from '../../models/models';
import { IDelivery } from '../../interfaces';

class OrderDeliveryService {
    async createDelivery(
        type: string,
        city: string,
        street: string,
        house: number,
        room: number,
        comment: string,
        department: number,
        orderId: number,
    ): Promise<IDelivery | undefined> {
        let delivery;
        if (type === 'Самовивіз') {
            // @ts-ignore
            delivery = await model.Delivery.create({ type, orderId });
        }
        if (type === 'Курєр') {
            // @ts-ignore
            delivery = await model.Delivery.create({
                type, city, street, house, room, comment, orderId,
            });
        }
        if (type === 'Нова Пошта') {
            // @ts-ignore
            delivery = await model.Delivery.create({
                type, city, department, orderId,
            });
        }
        if (type === 'УкрПошта') {
            // @ts-ignore
            delivery = await model.Delivery.create({
                type, city, department, orderId,
            });
        }
        return delivery;
    }
}

export const orderDeliveryService = new OrderDeliveryService();
