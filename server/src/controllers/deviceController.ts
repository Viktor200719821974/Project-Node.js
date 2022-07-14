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

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { brandId, typeId, name } = req.query;
            let { limit, page } = req.query;
            // @ts-ignore
            page = +page || 1;
            // @ts-ignore
            limit = +limit || 12;
            // @ts-ignore
            const offset = page * limit - limit;
            // @ts-ignore
            // eslint-disable-next-line max-len
            const devices = await deviceService.getAll(+brandId, +typeId, name, limit, page, offset);
            res.json(devices);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const device = await deviceService.getOne(Number(id));
            res.json(device);
        } catch (e) {
            next();
        }
    }

    async updateDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const device = req.body;
            const updateDevice = await deviceService.updateDevice(+id, device);
            res.json(updateDevice);
        } catch (e) {
            next();
        }
    }

    async deleteDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await deviceService.deleteDevice(+id);
            res.json('Ok');
        } catch (e) {
            next();
        }
    }

    async addInfoDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { title, description } = req.body;
            const deviceInfo = await deviceService.addInfoDevice(+id, title, description);
            res.json(deviceInfo);
        } catch (e) {
            next();
        }
    }

    async changeDeviceInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deviceInfo = await deviceService.changeDeviceInfo(+id, req.body);
            res.json(deviceInfo);
        } catch (e) {
            next();
        }
    }

    async deleteDeviceInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await deviceService.deleteDeviceInfo(+id);
            res.json('Ok');
        } catch (e) {
            next();
        }
    }
}

export const deviceController = new DeviceController();
