import { Request, Response } from 'express';
import { model } from '../models/models';

class TypeController {
    async create(req: Request, res: Response) {
        const { name } = req.body;
        const type = await model.Type.create({ name });
        return res.json(type);
    }

    async getAll(req: Request, res: Response) {
        const types = await model.Type.findAll();
        return res.json(types);
    }
}

export const typeController = new TypeController();
