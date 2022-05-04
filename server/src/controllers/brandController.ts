import { Request, Response } from 'express';
import { model } from '../models/models';

class BrandController {
    async create(req: Request, res: Response) {
        const { name } = req.body;
        const brand = await model.Brand.create({ name });
        return res.json(brand);
    }

    async getAll(req: Request, res: Response) {
        const brands = await model.Brand.findAll();
        return res.json(brands);
    }
}

export const brandController = new BrandController();
