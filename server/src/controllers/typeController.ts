import { NextFunction, Request, Response } from 'express';
import { typeService } from '../services/typeService';

class TypeController {
    async createType(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            const type = await typeService.createType(name);
            res.json(type);
            return;
        } catch (e) {
            next(e);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const type = await typeService.getAll();
            // res.setHeader('Access-Control-Allow-Origin', req.header('origin')
            //     || req.header('x-forwarded-host') || req.header('referer') || req.header('host'));
            // res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
            res.json(type);
            return;
        } catch (e) {
            next(e);
        }
    }

    async updateType(req:Request, res:Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updateType = await typeService.updateType(name, id);
            res.json(updateType);
        } catch (e) {
            next(e);
        }
    }

    async deleteType(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await typeService.deleteType(id);
            res.json('Ok');
        } catch (e) {
            next(e);
        }
    }
}

export const typeController = new TypeController();
