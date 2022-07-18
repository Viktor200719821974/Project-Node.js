import S3, { ManagedUpload } from 'aws-sdk/clients/s3';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/config';

class S3Service {
    Bucket;

    constructor() {
        this.Bucket = new S3({
            region: config.S3_REGION,
            accessKeyId: config.S3_ACCESS_KEY,
            secretAccessKey: config.S3_SECRET_KEY,
        });
    }

    uploadFile(file: UploadedFile, type: string, id: number)
        : Promise<ManagedUpload.SendData> {
        const uploadFilePath = this.fileNameBuilder(file.name, type, id);
        return this.Bucket.upload({
            Bucket: config.S3_NAME as string,
            Body: file.data,
            Key: uploadFilePath,
            ContentType: file.mimetype,
            ACL: 'public-read',
        })
            .promise(); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }

    deleteFile(key: string) {
        this.Bucket.deleteObject({
            Bucket: config.S3_NAME as string,
            Key: key,
        })
            .promise().then((c) => c);
    }

    private fileNameBuilder(fileName: string, type: string, id: number): string {
        const fileExtension = path.extname(fileName); // .png
        return `${type}/${id}/${uuidv4()}${fileExtension}`;
    }
}

export const s3Service = new S3Service();
