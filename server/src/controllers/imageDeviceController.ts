import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
// import { ErrorHandler } from '../error/errorHandler';
import { imageDeviceService } from '../services/imageDeviceService';

class ImageDeviceController {
    // async createImage(req: Request, res: Response, next: NextFunction) :Promise<void> {
    //     try {
    //         const { id } = req.params;
    //         const image = req.files?.imageName as UploadedFile;
    //         const imageType = image.mimetype;
    //         const imageData = image.data;
    //         if (!image) {
    //             next(new ErrorHandler('Not file image'));
    //         }
    // eslint-disable-next-line max-len
    //         const imageDevice = await imageDeviceService.imageDeviceCreate(id, image, imageType, imageData, next);
    //         const imageId = imageDevice.get('id');
    //         const imageExclude = await imageDeviceService.findImage(Number(imageId));
    //         res.json(imageExclude);
    //     } catch (e) {
    //         next();
    //     }
    // }

    async createImageAws(req: Request, res: Response, next: NextFunction) {
        try {
            const image = req.files?.image as UploadedFile;
            const { id } = req.params;
            const imageDrop = await imageDeviceService.createImageAws(image, Number(id), next);
            res.json(imageDrop);
        } catch (e) {
            next(e);
        }
    }

    async getAllImage(req: Request, res: Response, next: NextFunction) {
        try {
            const image = await imageDeviceService.getAllImage();
            res.json(image);
        } catch (e) {
            next(e);
        }
    }

    async getImagesDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const image = await imageDeviceService.getImagesDevice(Number(id));
            res.json(image);
        } catch (e) {
            next(e);
        }
    }

    async deleteImageAws(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await imageDeviceService.deleteImageAws(+id, next);
            res.json('Ok');
        } catch (e) {
            next(e);
        }
    }
}

export const imageDeviceController = new ImageDeviceController();
