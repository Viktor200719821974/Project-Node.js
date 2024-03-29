import { NextFunction, Request, Response } from 'express';
import { brandService } from '../services/brandService';

class BrandController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            const brand = await brandService.createBrand(name);
            res.json(brand);
            return;
        } catch (e) {
            next(e);
        }
    }

    async updateBrand(req:Request, res:Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updateBrand = await brandService.updateBrand(name, id);
            res.json(updateBrand);
        } catch (e) {
            next(e);
        }
    }

    async deleteBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await brandService.deleteBrand(id);
            res.json('Ok');
        } catch (e) {
            next(e);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const brand = await brandService.getAll();
            // res.setHeader('Access-Control-Allow-Origin', req.header('origin')
            //     || req.header('x-forwarded-host') || req.header('referer') || req.header('host'));
            // res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
            res.json(brand);
            return;
        } catch (e) {
            next(e);
        }
    }
}

export const brandsController = new BrandController();