import { model } from '../../models/models';

class ImageOrderService {
    async imageOrder(deviceId: number[]): Promise<string[]> {
        const imageDevice = await model.ImageDeviceAws.findAll({ where: { deviceId } })
            .then((data) => data);
        const arr: any[] = [];
        // eslint-disable-next-line array-callback-return
        imageDevice.filter((item) => {
            const i = arr.findIndex((x) => (x.deviceId === item.deviceId));
            if (i <= -1) {
                arr.push(item);
            }
            return null;
        });
        return arr.map((c) => c.imageLocation);
    }
}

export const imageOrderService = new ImageOrderService();
