import { model } from '../models/models';

class RatingService {
    async getRatingDeviceId(deviceId: number) {
        return model.Rating.findAll({ where: { deviceId } });
    }
}

export const ratingService = new RatingService();
