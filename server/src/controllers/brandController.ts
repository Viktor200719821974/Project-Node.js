import { Request, Response } from 'express';
import { model } from '../models/models';

class BrandController {
    async create(req: Request, res: Response) {
        const { name } = req.body;
        const brand = await model.Brand.create({ name });
        return res.json(brand);
    }

    async updateBrand(req:Request, res:Response) {
        const { id } = req.params;
        const { name } = req.body;
        await model.Brand.update(
            {
                name,
            },
            {
                where: { id },
            },
        );
        const updateBrand = await model.Brand.findByPk(id);
        res.json(updateBrand);
    }

    async getAll(req: Request, res: Response) {
        const brands = await model.Brand.findAll();
        return res.json(brands);
    }
}

export const brandController = new BrandController();
