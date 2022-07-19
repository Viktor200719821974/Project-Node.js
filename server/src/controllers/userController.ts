import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/userService';
import { IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../error/errorHandler';

class UserController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.query;
            let { limit, page } = req.query;
            // @ts-ignore
            page = +page || 1;
            // @ts-ignore
            limit = +limit || 12;
            // @ts-ignore
            const offset = page * limit - limit;
            // @ts-ignore
            const users = await userService.getAll(+page, offset, +limit, email);
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

    // async updateUser(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { id } = req.params;
    //         const user = req.body;
    //         const updateUser = await userService.updateUser(id, user);
    //         res.json(updateUser);
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await userService.deleteUser(id);
            res.json('Ok');
        } catch (e) {
            next(e);
        }
    }

    async userManager(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.userManager(+id);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async userIsNotManager(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.userIsNotManager(+id);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async userBlocked(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.userBlocked(+id);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async userUnlocked(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.userUnlocked(+id);
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

    // async check(req:IRequestExtended, res: Response, next: NextFunction) {
    //     try {
    //         const user = req.user as IUser;
    //         res.json(user);
    //     } catch (e: any) {
    //         next(e);
    //     }
    // }
}

export const userController = new UserController();
