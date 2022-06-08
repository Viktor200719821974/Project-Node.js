import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/userService';
import { IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../error/errorHandler';

class UserController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAll();
            res.json(users);
            return;
        } catch (e) {
            next(e);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.getOne(Number(id));
            res.json(user);
            return;
        } catch (e) {
            next(e);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = req.body;
            const updateUser = await userService.updateUser(id, user);
            res.json(updateUser);
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await userService.deleteUser(id);
            res.status(204).end();
        } catch (e) {
            next(e);
        }
    }

    async userManager(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const { email } = req.user;
            const { id } = req.params;
            await userService.userManager(Number(id), email, next);
            const user = await userService.getOne(Number(id));
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async userIsNotManager(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const { email } = req.user;
            const { id } = req.params;
            await userService.userIsNotManager(Number(id), email, next);
            const user = await userService.getOne(Number(id));
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async userBlocked(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const { email } = req.user;
            const { id } = req.params;
            await userService.userBlocked(Number(id), email, next);
            const user = await userService.getOne(Number(id));
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async userUnlocked(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const { email } = req.user;
            const { id } = req.params;
            await userService.userUnlocked(Number(id), email, next);
            const user = await userService.getOne(Number(id));
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async activateUser(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const activateToken = req.params.token;
            if (!activateToken) {
                next(new ErrorHandler('Bad request'));
            }
            await userService.activateUser(activateToken, next);
            res.json('User activated');
        } catch (e) {
            next(e);
        }
    }

    async check(req: Request, res: Response, next: NextFunction) {
        try {
            res.json('All Right');
        } catch (e: any) {
            next(e);
            console.log(e.message);
        }
    }
}

export const userController = new UserController();
