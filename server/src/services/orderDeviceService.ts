import { model } from '../models/models';

class OrderDeviceService {
    async createOrderDevice(userId: number, deliveryId: any) {
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
        // for (let i = 0; i < deviceId.length; i++) {
        //     const device = model.Device.findOne({ where: { id: deviceId[i] } });
        //     const price = device.then((data) => console.log(data));
        //     console.log(price);
        // }
        console.log(price);
        // console.log(amount);
        return amount;
    }
}

export const orderDeviceService = new OrderDeviceService();
