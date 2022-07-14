import { NextFunction } from 'express';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';

class RatingService {
    async getRatingDeviceId(deviceId: number, next: NextFunction) {
        const rating = await RatingService._getErrorData(deviceId, next);
        const ratingId = rating?.get('id');
        return model.RatingDevice.findAll({ where: { ratingId } });
    }

    async createRatingDevice(
        deviceId: number,
        rate: number,
        userId: number,
        comment: string,
        next: NextFunction,
    ) {
        const rating = await RatingService._getErrorData(deviceId, next);
        const userName = await model.User.findOne({ where: { id: userId } })
            .then((data) => data?.name);
        const ratingId = rating?.get('id');
        const ratingDevice = await model.RatingDevice.create({
            rate, ratingId, userId, comment, userName,
        });
        const count = await model.RatingDevice.count({ where: { ratingId }, col: 'rate' });
        const sum = await model.RatingDevice.sum('rate', { where: { ratingId } });
        const averageRating = Math.ceil(sum / count);
        await model.Rating.update({ averageRating }, { where: { deviceId } });
        return ratingDevice;
    }

    static async _getErrorData(deviceId: number, next: NextFunction) {
        const device = await model.Device.findOne({ where: { id: deviceId } });
        if (!device) {
            next(new ErrorHandler('Device not found', 404));
        }
        const rating = await model.Rating.findOne({ where: { deviceId } });
        if (!rating) {
            next(new ErrorHandler('Rating not found', 404));
        }
        return rating;
    }
}

export const ratingService = new RatingService();
