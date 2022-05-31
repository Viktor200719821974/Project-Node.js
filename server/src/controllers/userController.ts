import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/userService';
import { IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../error/errorHandler';

// const generateJwt = (id:number, email: string, role: string) => jwt.sign(
//     { id, email, role },
//         config.SECRET_ACCESS_KEY!,
//         { expiresIn: '24h' },
// );

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

    async updateUser(req:Request, res:Response, next: NextFunction) {
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
            const { userEmail } = req.user;
            const { id } = req.params;
            await userService.userManager(Number(id), userEmail, next);
            res.json('User is manager');
        } catch (e) {
            next(e);
        }
    }

    async userIsNotManager(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const { userEmail } = req.user;
            const { id } = req.params;
            await userService.userIsNotManager(Number(id), userEmail, next);
            res.json('User is not manager');
        } catch (e) {
            next(e);
        }
    }

    async userBlocked(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const { userEmail } = req.user;
            const { id } = req.params;
            await userService.userBlocked(Number(id), userEmail, next);
            res.json('User is blocked');
        } catch (e) {
            next(e);
        }
    }

    async userUnlocked(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const { userEmail } = req.user;
            const { id } = req.params;
            await userService.userUnlocked(Number(id), userEmail, next);
            res.json('User is unlocked');
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

    // async registration(req: Request, res: Response, next: NextFunction) {
    //     const { email, password, role } = req.body;
    //     if (!email || !password) {
    //         return next(new ErrorHandler('Bad request'));
    //     }
    //     const candidate = await model.User.findOne({ where: { email } });
    //     if (candidate) {
    //         return next(new ErrorHandler('Bad request'));
    //     }
    //     const hashPassword = await bcrypt.hash(password, 5);
    //     const user = await model.User.create({ email, role, password: hashPassword });
    //     const id = Number(user.get('id'));
    //     await model.Basket.create({ userId: id });
    //     const token = generateJwt(id, email, role);
    //     return res.json({ token });
    // }

    // async login(req: Request, res: Response, next: NextFunction) {
    //     const { email, password } = req.body;
    //     const user = await model.User.findOne({ where: { email } });
    //     if (!user) {
    //         return next(new ErrorHandler('Bad email or password'));
    //     }
    //     const userPassword = user.get('password');
    //     if (typeof userPassword === 'string') {
    //         const comparePassword = bcrypt.compareSync(password, userPassword);
    //         if (!comparePassword) {
    //             return next(new ErrorHandler('Bad email or password'));
    //         }
    //     }
    //     const id = Number(user.get('id'));
    //     const role = String(user.get('role'));
    //     const token = await generateJwt(id, email, role);
    //     return res.json({ token });
    // }

    // async check(req: Request, res: Response) {
    //     return res.json('All Right');
    // }
}

export const userController = new UserController();
