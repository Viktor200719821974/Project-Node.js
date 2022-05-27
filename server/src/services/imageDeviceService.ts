import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import { model } from '../models/models';

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

    async getOneImage(id: number) {
        return model.ImageDevice.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: { id },
        })
        //     .then((projects) => {
        //     // eslint-disable-next-line array-callback-return
        //     projects.map((project) => { // @ts-ignore
        //         // eslint-disable-next-line no-param-reassign
        //         project.get('imageData') = project.get('imageData').toString('base64');
        //     });
        //     return projects;
        // })
        // eslint-disable-next-line semi-style
        ;
    }
}

export const imageDeviceService = new ImageDeviceService();
