import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../error/errorHandler';
import { model } from '../models/models';
import { config } from '../config/config';

const generateJwt = (id:number, email: string, role: string) => jwt.sign(
    { id, email, role },
        config.SECRET_ACCESS_KEY!,
        { expiresIn: '24h' },
);

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler('Bad request'));
        }
        const candidate = await model.User.findOne({ where: { email } });
        if (candidate) {
            return next(new ErrorHandler('Bad request'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await model.User.create({ email, role, password: hashPassword });
        const id = Number(user.get('id'));
        const basket = await model.Basket.create({ userId: id });
        const token = generateJwt(id, email, role);
        console.log(basket);
        return res.json({ token });
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const user = await model.User.findOne({ where: { email } });
        if (!user) {
            return next(new ErrorHandler('Bad email or password'));
        }
        const userPassword = user.get('password');
        if (typeof userPassword === 'string') {
            const comparePassword = bcrypt.compareSync(password, userPassword);
            if (!comparePassword) {
                return next(new ErrorHandler('Bad email or password'));
            }
        }
        const id = Number(user.get('id'));
        const role = String(user.get('role'));
        const token = await generateJwt(id, email, role);
        return res.json({ token });
    }

    async check(req: Request, res: Response, next: NextFunction) {
        return res.json('All Right');
    }
}

export const userController = new UserController();
