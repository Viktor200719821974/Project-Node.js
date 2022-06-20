import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { ratingService } from '../services/ratingService';

class RatingController {
    async getRatingDeviceId(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { deviceId } = req.params;
            const rating = await ratingService.getRatingDeviceId(+deviceId, next);
            res.json(rating);
        } catch (e) {
            next(e);
        }
    }

    async createRatingDevice(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { deviceId, rate, comment } = req.body;
            // @ts-ignore
            const { id } = req.user;
            // eslint-disable-next-line max-len
            const rating = await ratingService.createRatingDevice(+deviceId, +rate, id, comment, next);
            res.json(rating);
        } catch (e) {
            next(e);
        }
    }
}

export const ratingController = new RatingController();
