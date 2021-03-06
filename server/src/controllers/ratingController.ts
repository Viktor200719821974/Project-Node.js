import { NextFunction, Request, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { ratingService } from '../services/ratingService';

class RatingController {
    async getRatingDeviceId(req: Request, res: Response, next: NextFunction) {
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

    async updateRatingDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { comment } = req.body;
            const updateRating = await ratingService.updateRatingDevice(+id, comment);
            res.json(updateRating);
        } catch (e) {
            next();
        }
    }

    async deleteRatingDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await ratingService.deleteRatingDevice(+id);
            res.json('Ok');
        } catch (e) {
            next();
        }
    }
}

export const ratingController = new RatingController();
