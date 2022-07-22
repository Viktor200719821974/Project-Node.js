import { model } from '../../models/models';
import { IOrder } from '../../interfaces';

class OrderService {
    async createOrder(userId: number, typePay: string) : Promise<number> {
        // @ts-ignore
        return model.OrderUser.create({ userId, typePay }).then((data) => data.id);
    }

    async getOrderId(id: number) : Promise<IOrder | null> {
        return model.OrderUser.findOne({
            where: { id },
            include: [
                { model: model.Delivery, as: 'delivery' },
                { model: model.OrderDevice, as: 'orderDevice' },
            ],
        });
    }

    async updateOrderDevice(sumaOrder: number, orderId: number): Promise<[affectedCount: number]> {
        return model.OrderUser.update({ sumaOrder }, { where: { id: orderId } });
    }

    async deleteBasketDevice(orderId: number, deviceId: number[]): Promise<IOrder | null> {
        const ordered = await model.OrderUser.findOne({
            where: { id: orderId },
            include: [
                { model: model.Delivery, as: 'delivery' },
                { model: model.OrderDevice, as: 'orderDevice' },
            ],
        });
        if (ordered) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < deviceId.length; i++) {
                model.BasketDevice.destroy({
                    where: { deviceId: deviceId[i] },
                }).then((data) => data);
            }
        }
        return ordered;
    }
}

export const orderService = new OrderService();
