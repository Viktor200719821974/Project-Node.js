import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import { model } from '../models/models';
import { s3Service } from './s3.service';
import { IImageDevice } from '../interfaces';
import { ErrorHandler } from '../error/errorHandler';

class ImageDeviceService {
    // eslint-disable-next-line max-len
    async imageDeviceCreate(deviceId: string, image: UploadedFile, imageType: string, imageData: Buffer, next: NextFunction) {
        const fileName = `${uuidv4()}.jpg`;
        fs.mkdir(path.join(__dirname, '..', 'static', 'imageDevice', deviceId), { recursive: true }, (e) => {
            if (e) {
                next(e);
            }
        });
        await image.mv(path.resolve(__dirname, '..', `static/imageDevice/${deviceId}`, fileName));
        return model.ImageDevice.create({
            imageName: fileName, imageType, imageData, deviceId,
        });
    }

    async findImage(imageId: number) {
        return model.ImageDevice.findOne({
            attributes: {
                exclude: ['imageData', 'createdAt', 'updatedAt'],
            },
            where: { imageId },
        });
    }

    async getAllImage() {
        return model.ImageDevice.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });
    }

    async getOneImage(id: number) {
        return model.ImageDevice.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: { id },
        });
    }

    // eslint-disable-next-line max-len
    async createImageAws(image: UploadedFile, id: number, next: NextFunction) : Promise<IImageDevice> {
        if (!image) {
            next(new ErrorHandler('Bad Request'));
        }
        const uploadImage = await s3Service.uploadFile(image, 'imageDevice', Number(id));
        // @ts-ignore
        return model.ImageDeviceAws.create({ imageLocation: uploadImage?.Location, deviceId: id });
    }
}

export const imageDeviceService = new ImageDeviceService();
