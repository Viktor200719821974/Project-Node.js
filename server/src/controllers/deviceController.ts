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
            const { img } = req.files;
            const fileName = `${uuidv4()}.jpg`;
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await model.Device.create({
                name, price, brandId, typeId, image: fileName,
            });
            console.log(device);
            console.log(info);
            return res.json(device);
        } catch (e: any) {
            next(e);
        }
    }

    async getAll(req: Request, res: Response) {
        const devices = await model.Device.findAll();
        return res.json(devices);
    }

    async getOne(req: Request, res: Response) {
        const device = await model.Device.findOne();
        return res.json(device);
    }
}

export const deviceController = new DeviceController();
