import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { ErrorHandler } from '../error/errorHandler';
import { imageDeviceService } from '../services/imageDeviceService';
import { deviceService } from '../services/deviceService';
// import { constants } from '../constants';

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

    async createImage(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const image = req.files?.imageName as UploadedFile;
            const imageType = image.mimetype;
            const imageData = image.data;
            if (!image) {
                next(new ErrorHandler('Not file image'));
            }
            // eslint-disable-next-line max-len
            const imageDevice = await imageDeviceService.imageDeviceCreate(id, image, imageType, imageData, next);
            const imageId = imageDevice.get('id');
            const imageExclude = await imageDeviceService.findImage(Number(imageId));
            res.json(imageExclude);
        } catch (e) {
            next();
        }
    }

    async createImageAws(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body);
        } catch (e) {
            next(e);
        }
    }

    async getOneImage(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const image = await imageDeviceService.getOneImage(Number(id));
            // const imageD = image.id;
            // console.log(image);
            // @ts-ignore
            // const imageData = constants.BUFFER.toString('base64');
            // const objBuffer = Buffer.from(constants.BUFFER, 'base64');
            // const reader = new FileReader();
            // const imageUrl = reader.readAsDataURL(imageData);
            // console.log();
            res.json(image);
        } catch (e) {
            next(e);
        }
    }
}

export const deviceController = new DeviceController();
