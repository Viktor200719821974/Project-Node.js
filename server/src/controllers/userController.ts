import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../error/errorHandler';

class UserController {
    async registration(req: Request, res: Response) {

    }

    async login(req: Request, res: Response) {

    }

    async check(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        if (!id) {
            next(new ErrorHandler('Bad request', 402));
            return;
        }
        res.json(id);
    }
}

export const userController = new UserController();
