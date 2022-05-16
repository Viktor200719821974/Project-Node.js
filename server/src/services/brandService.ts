import { model } from '../models/models';

class BrandService {
    async getAll() {
        return model.Brand.findAll();
    }

    async createBrand(name: string) {
        return model.Brand.create({ name });
    }

    async updateBrand(name: string, id: string) {
        await model.Brand.update(
            {
                name,
            },
            {
                where: { id },
            },
        );
        return model.Brand.findByPk(id);
    }

    async deleteBrand(id: string) {
        await model.Brand.destroy({ where: { id } });
    }
}
export const brandService = new BrandService();
