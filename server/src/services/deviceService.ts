import { model } from '../models/models';
import { IDevice } from '../interfaces';

class DeviceService {
    async createDevice(deviceRequest: IDevice) {
        const {
            name, price, typeId, brandId, info, imageDevice,
        } = deviceRequest;
        const device = await model.Device.create({
            name, price, brandId, typeId,
        });
        if (imageDevice) {
            const inf = JSON.parse(imageDevice);
            inf.forEach((i: { image: string; }) => model.ImageDevice.create(
                {
                    image: i.image,
                    deviceId: device.get('id'),
                },
            ));
        }
        if (info) {
            const inf = JSON.parse(info);
            inf.forEach((i: { title: string; description: string; }) => model.DeviceInfo.create(
                {
                    title: i.title,
                    description: i.description,
                    deviceId: device.get('id'),
                },
            ));
        }
        return device;
    }

    async getAll(brandId: number, typeId: number) {
        let devices;
        if (!brandId && !typeId) {
            devices = await model.Device.findAndCountAll();
        }
        if (brandId && !typeId) {
            devices = await model.Device.findAndCountAll({ where: { brandId } });
        }
        if (!brandId && typeId) {
            devices = await model.Device.findAndCountAll({ where: { typeId } });
        }
        if (brandId && typeId) {
            devices = await model.Device.findAndCountAll({ where: { brandId, typeId } });
        }
        return devices;
    }

    async getOne(id: number) {
        return model.Device.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: { id },
            include: [{ model: model.DeviceInfo, as: 'info' }],
        });
    }
}

export const deviceService = new DeviceService();
