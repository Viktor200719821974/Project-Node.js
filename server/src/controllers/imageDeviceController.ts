import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { ErrorHandler } from '../error/errorHandler';
import { imageDeviceService } from '../services/imageDeviceService';
import { s3Service } from '../services/s3.service';
import { model } from '../models/models';

class ImageDeviceController {
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
            const image = req.files?.image as UploadedFile;
            const { id } = req.params;
            let uploadImage;
            if (image) {
                uploadImage = await s3Service.uploadFile(image, 'imageDevice', Number(id));
            }
            // eslint-disable-next-line max-len
            const imageDrop = await model.ImageDevice.create({ imageLocation: uploadImage?.Location, deviceId: id });
            res.json(imageDrop);
        } catch (e) {
            next(e);
        }
    }

    async getOneImage(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const image = await imageDeviceService.getOneImage(Number(id));
            res.json(image);
        } catch (e) {
            next(e);
        }
    }
}

export const imageDeviceController = new ImageDeviceController();
