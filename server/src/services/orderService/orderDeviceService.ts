import { model } from '../../models/models';

class OrderDeviceService {
    async createOrderDevice(userId: number, deliveryId: number, orderId: number): Promise<number> {
        const basketId = await model.Basket.findOne({ where: { userId } })
            .then((data) => data?.id);
        const devicesBasket = await model.BasketDevice.findAll({ where: { basketId } })
            .then((data) => data);
        const deviceId = devicesBasket.map((c) => c.deviceId);
        const amount = devicesBasket.map((c) => c.amount);
        const devices = await model.Device.findAll({
            where: {
                id: deviceId,
            },
        }).then((data) => data);
        const price = devices.map((c) => c.price);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < deviceId.length; i++) {
            Number(deviceId[i]);
            Number(amount[i]);
            Number(price[i]);
            // @ts-ignore
            model.OrderDevice.create({
                amountDevice: amount[i],
                deviceId: deviceId[i],
                priceDevice: price[i],
                sumPriceDevice: price[i] * amount[i],
                orderId,
                deliveryId,
            }).then((data) => data);
        }
        return (price.reduce((r, a, i) => r + a * amount[i], 0));
    }
}

export const orderDeviceService = new OrderDeviceService();
