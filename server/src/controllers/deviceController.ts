import { NextFunction, Request, Response } from 'express';
import { deviceService } from '../services/deviceService';

class DeviceController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const device = await deviceService.createDevice(req.body);
            res.json(device);
        } catch (e: any) {
            next(e);
        }
    }

    async getAll(req: Request, res: Response) {
        const { brandId, typeId } = req.query;
        let { limit, page } = req.query;
        // @ts-ignore
        page = +page || 1;
        // @ts-ignore
        limit = +limit || 12;
        // @ts-ignore
        const offset = page * limit - limit;
        // @ts-ignore
        // eslint-disable-next-line max-len
        const devices = await deviceService.getAll(+brandId, +typeId, limit, page, offset);
        return res.json(devices);
    }

    async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const device = await deviceService.getOne(Number(id));
        return res.json(device);
    }
}

export const deviceController = new DeviceController();
