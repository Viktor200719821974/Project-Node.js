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
        // let {limit, page} =req.query;
        // page = Number(page) || 1;
        // limit = Number(limit) || 9;
        // let offset = page * limit - limit;
        const devices = await deviceService.getAll(Number(brandId), Number(typeId));
        return res.json(devices);
    }

    async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const device = await deviceService.getOne(Number(id));
        return res.json(device);
    }
}

export const deviceController = new DeviceController();
