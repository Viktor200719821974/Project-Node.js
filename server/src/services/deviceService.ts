import { model } from '../models/models';
import { IDevice } from '../interfaces';

class DeviceService {
    // eslint-disable-next-line max-len
    async createDevice(deviceRequest: {name: string; price: number; typeId: number; brandId: number; info: string; }): Promise<IDevice> {
        const {
            name, price, typeId, brandId, info,
        } = deviceRequest;
        Number(price);
        // @ts-ignore
        const device = await model.Device.create({
            name, price, brandId, typeId,
        });
        // if (imageDeviceAws) {
        //     const inf = JSON.parse(imageDeviceAws);
        //     console.log(inf);
            // inf.forEach((i: { imageLocation: string; }) => model.ImageDeviceAws.create(
            //     {
            //         imageLocation: i.imageLocation,
            //         deviceId: 3,
            //     },
            // ));
        // }
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
            include: [{ model: model.DeviceInfo, as: 'info' }, { model: model.ImageDeviceAws, as: 'imageDeviceAws' }],
        });
    }
}

export const deviceService = new DeviceService();
