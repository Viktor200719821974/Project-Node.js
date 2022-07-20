// import { v4 as uuidv4 } from 'uuid';
// import fs from 'fs';
// import path from 'path';
import { NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import { model } from '../models/models';
import { s3Service } from './s3.service';
import { IImageDevice } from '../interfaces';
import { ErrorHandler } from '../error/errorHandler';

class ImageDeviceService {
    // eslint-disable-next-line max-len
    // async imageDeviceCreate(deviceId: string, image: UploadedFile, imageType: string, imageData: Buffer, next: NextFunction) {
    //     const fileName = `${uuidv4()}.jpg`;
    // eslint-disable-next-line max-len
    //     fs.mkdir(path.join(__dirname, '..', 'static', 'imageDevice', deviceId), { recursive: true }, (e) => {
    //         if (e) {
    //             next(e);
    //         }
    //     });
    // eslint-disable-next-line max-len
    //     await image.mv(path.resolve(__dirname, '..', `static/imageDevice/${deviceId}`, fileName));
    //     return model.ImageDeviceAws.create({
    //         imageName: fileName, imageType, imageData, deviceId,
    //     });
    // }

    // async findImage(imageId: number) {
    //     return model.ImageDeviceAws.findOne({
    //         attributes: {
    //             exclude: ['imageData', 'createdAt', 'updatedAt'],
    //         },
    //         where: { imageId },
    //     });
    // }

    async getAllImage() {
        return model.ImageDeviceAws.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });
    }

    async getImagesDevice(id: number) {
        return model.ImageDeviceAws.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: { deviceId: id },
        });
    }

    async createImageAws(
        image: UploadedFile,
        id: number,
        next: NextFunction,
    ) : Promise<IImageDevice> {
        if (!image) {
            next(new ErrorHandler('Bad Request'));
        }
        const uploadImage = await s3Service.uploadFile(image, 'imageDevice', Number(id));
        // @ts-ignore
        return model.ImageDeviceAws.create({
            imageLocation: uploadImage?.Location,
            deviceId: id,
            key: uploadImage.Key,
        });
    }

    async deleteImageAws(id: number, next: NextFunction) {
        const key = await model.ImageDeviceAws.findOne({ where: { id } }).then((data) => data?.key);
        if (key) {
            await s3Service.deleteFile(key);
        } else {
            next(new ErrorHandler('Not found key image device', 404));
        }
        return model.ImageDeviceAws.destroy({ where: { key } });
    }
}

export const imageDeviceService = new ImageDeviceService();
