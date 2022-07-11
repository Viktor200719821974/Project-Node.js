import { model } from '../models/models';
import { IBrand } from '../interfaces';

class BrandService {
    async getAll(): Promise<IBrand[]> {
        return model.Brand.findAll();
    }

    async createBrand(name: string): Promise<IBrand> {
        // @ts-ignore
        return model.Brand.create({ name });
    }

    async updateBrand(name: string, id: string): Promise<IBrand | null> {
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

    async deleteBrand(id: string): Promise<number> {
        return model.Brand.destroy({ where: { id } });
    }
}
export const brandService = new BrandService();
