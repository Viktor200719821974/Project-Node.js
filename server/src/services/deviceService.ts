import { Op } from 'sequelize';
import { model } from '../models/models';
import { IDevice, IPaginationResponse } from '../interfaces';

class DeviceService {
    async createDevice(deviceRequest: {
        name: string; price: number; typeId: number; brandId: number; info: string;
        color: string; width: number; height: number; depth: number;
    })
        : Promise<IDevice> {
        const {
            name, color, width, height, depth, price, typeId, brandId, info,
        } = deviceRequest;
        Number(price);
        // @ts-ignore
        const device = await model.Device.create({
            name, color, width, height, depth, price, brandId, typeId,
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

    async getAll(
        brandId: number,
        typeId: number,
        name: string,
        limit: number,
        page: number,
        offset: number,
    ): Promise<IPaginationResponse<IDevice>> {
        let devices;
        if (!brandId && !typeId && !name) {
            devices = await model.Device.findAndCountAll({
                limit,
                offset,
                include: [{ model: model.Rating, as: 'rating' }],
                order: [[{ model: model.Rating, as: 'rating' }, 'averageRating', 'DESC']],
            });
        }
        if (brandId && !typeId) {
            devices = await model.Device.findAndCountAll({
                where: { brandId },
                limit,
                offset,
                include: [{ model: model.Rating, as: 'rating' }],
                order: [[{ model: model.Rating, as: 'rating' }, 'averageRating', 'DESC']],
            });
        }
        if (!brandId && typeId) {
            devices = await model.Device.findAndCountAll({
                where: { typeId },
                limit,
                offset,
                include: [{ model: model.Rating, as: 'rating' }],
                order: [[{ model: model.Rating, as: 'rating' }, 'averageRating', 'DESC']],
            });
        }
        if (brandId && typeId) {
            devices = await model.Device.findAndCountAll({
                where: { brandId, typeId },
                limit,
                offset,
                include: [{ model: model.Rating, as: 'rating' }],
                order: [[{ model: model.Rating, as: 'rating' }, 'averageRating', 'DESC']],
            });
        }
        if (name && !brandId && !typeId) {
            devices = await model.Device.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                },
                limit,
                offset,
                include: [{ model: model.Rating, as: 'rating' }],
                order: [[{ model: model.Rating, as: 'rating' }, 'averageRating', 'DESC']],
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

    async updateDevice(id: number, device: IDevice): Promise<IDevice | null> {
        await model.Device.update(
            {
                ...device,
            },
            {
                where: { id },
            },
        );
        return model.Device.findByPk(id);
    }

    async deleteDevice(id: number): Promise<number> {
        return model.Device.destroy({ where: { id } });
    }
}

export const deviceService = new DeviceService();
