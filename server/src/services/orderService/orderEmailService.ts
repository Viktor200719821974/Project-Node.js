import { SentMessageInfo } from 'nodemailer';
import { model } from '../../models/models';
import { IDevice } from '../../interfaces';
import { emailService } from '../emailService';
import { imageOrderService } from './imageOrderService';

class OrderEmailService {
    async sendOrderEmail(
        devices: IDevice[],
        orderId: number,
        name: string,
        surname:string,
        sumaOrder: number,
        email: string,
        deviceId: number[],
    ): Promise<SentMessageInfo> {
        const devicesOrder = await model.OrderDevice.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: { orderId },
        });
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
        if (typeId.length > typeDevice.length) {
            typeDevice.push(typeDevice[0]);
        }
        if (brandId.length > brand.length) {
            brand.push(brand[0]);
        }
        const image = await imageOrderService.imageOrder(deviceId);
        const devicesString = JSON.stringify(devicesOrder);
        const devicesJson = JSON.stringify(devices);
        const typeJson = JSON.stringify(typeDevice);
        const brandJson = JSON.stringify(brand);
        const imageJson = JSON.stringify(image);
        return emailService.sendMail(email, 'ORDER_DEVICE', {
            userName: name,
            surname,
            sumaOrder,
            devicesString,
            devicesJson,
            typeJson,
            brandJson,
            imageJson,
        });
    }
}

export const orderEmailService = new OrderEmailService();
