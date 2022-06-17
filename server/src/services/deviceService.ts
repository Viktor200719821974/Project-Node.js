import { model } from '../models/models';
import { IDevice, IPaginationResponse } from '../interfaces';

class DeviceService {
    async createDevice(deviceRequest: {
        name: string; price: number; typeId: number; brandId: number; info: string;
    })
        : Promise<IDevice> {
        const {
            name, price, typeId, brandId, info,
        } = deviceRequest;
        Number(price);
        // @ts-ignore
        const device = await model.Device.create({
            name, price, brandId, typeId,
        });
        const deviceId = device.get('id');
        await model.Rating.create({ deviceId });
        if (info) {
            const inf = JSON.parse(info);
            inf.forEach((i: { title: string; description: string; }) => model.DeviceInfo.create(
                {
                    title: i.title,
                    description: i.description,
                    deviceId,
                },
            ));
        }
        return device;
    }

    async getAll(brandId: number, typeId: number, limit: number, page: number, offset: number)
        : Promise<IPaginationResponse<IDevice>> {
        let devices;
        if (!brandId && !typeId) {
            devices = await model.Device.findAndCountAll({
                limit,
                offset,
                include: [{ model: model.Rating, as: 'rating' }],
            });
        }
        if (brandId && !typeId) {
            devices = await model.Device.findAndCountAll({
                where: { brandId },
                limit,
                offset,
                include: [{ model: model.Rating, as: 'rating' }],
            });
        }
        if (!brandId && typeId) {
            devices = await model.Device.findAndCountAll({
                where: { typeId },
                limit,
                offset,
                include: [{ model: model.Rating, as: 'rating' }],
            });
        }
        if (brandId && typeId) {
            devices = await model.Device.findAndCountAll({
                where: { brandId, typeId }, limit, offset,
            });
        }
        // @ts-ignore
        const { rows, count } = devices;
        return {
            page,
            perPage: limit,
            rows,
            count,
        };
    }

    async getOne(id: number) {
        return model.Device.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: { id },
            include: [
                { model: model.DeviceInfo, as: 'info' },
                { model: model.ImageDeviceAws, as: 'imageDeviceAws' },
                { model: model.Rating, as: 'rating' },
            ],
        });
    }
}

export const deviceService = new DeviceService();
