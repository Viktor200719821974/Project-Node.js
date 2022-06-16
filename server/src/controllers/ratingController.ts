import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { ratingService } from '../services/ratingService';

class RatingController {
    async getRatingDeviceId(req: IRequestExtended, res: Response, next: NextFunction) {
        const { deviceId } = req.params;
        const rating = await ratingService.getRatingDeviceId(+deviceId);
        res.json(rating);
    }
}

export const ratingController = new RatingController();
