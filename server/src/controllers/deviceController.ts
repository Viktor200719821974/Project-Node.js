import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { model } from '../models/models';

class DeviceController {
    // eslint-disable-next-line consistent-return
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                name, price, typeId, brandId, info,
            } = req.body;
            // @ts-ignore
            const { image } = req.files;
            const fileName = `${uuidv4()}.jpg`;
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await model.Device.create({
                name, price, brandId, typeId, image: fileName,
            });
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
            return res.json(device);
        } catch (e: any) {
            next(e);
        }
    }

    async getAll(req: Request, res: Response) {
        const { brandId, typeId } = req.query;
        // let {limit, page} =req.query;
        // page = Number(page) || 1;
        // limit = Number(limit) || 9;
        // let offset = page * limit - limit;
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
        return res.json(devices);
    }

    async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const device = await model.Device.findOne({
            where: { id },
            include: [{ model: model.DeviceInfo, as: 'info' }],
        });
        return res.json(device);
    }
}

export const deviceController = new DeviceController();
