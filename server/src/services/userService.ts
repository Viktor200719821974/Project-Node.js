import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { IUser } from '../interfaces';
import { config } from '../config/config';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';
import { emailService } from './emailService';

class UserService {
    async getAll(): Promise<IUser[]> {
        return model.User.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
        });
    }

    async getOne(id: number): Promise<IUser | null> {
        return model.User.findOne({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
            where: { id },
        });
    }

    async createUser(user: IUser, next: NextFunction): Promise<IUser> {
        const { password, email } = user;
        const userEmail = await model.User.findOne({ where: { email } });
        if (userEmail) {
            next(new ErrorHandler(`User with email: ${email} already exists`));
        }
        const hashedPassword = await UserService._hashPassword(password);
        const newUser = await model.User.create({ ...user, password: hashedPassword });
        const id = newUser.get('id');
        Number(id);
        await model.Basket.create({ userId: id });
        return user;
    }

    async updateUser(id: string, user: IUser): Promise<IUser | null> {
        await model.User.update(
            {
                ...user,
            },
            {
                where: { id },
            },
        );
        return model.User.findByPk(id);
    }

    async deleteUser(id:string) {
        return model.User.destroy({ where: { id } });
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        return model.User.findOne({ where: { email } });
    }

    async userManager(id: number, userEmail: string, next: NextFunction) {
        const user = await model.User.findOne({ where: { email: userEmail } });
        if (user) {
            const superuser = user.get('is_superuser');
            if (!superuser) {
                next(new ErrorHandler('Forbidden', 403));
            }
        }
        return model.User.update({ is_staff: true }, { where: { id } });
    }

    async userIsNotManager(id: number, userEmail: string, next: NextFunction) {
        const user = await model.User.findOne({ where: { email: userEmail } });
        if (user) {
            const superuser = user.get('is_superuser');
            if (!superuser) {
                next(new ErrorHandler('Forbidden', 403));
            }
        }
        return model.User.update({ is_staff: false }, { where: { id } });
    }

    async userBlocked(id: number, userEmail: string, next: NextFunction) {
        const user = await model.User.findOne({ where: { email: userEmail } });
        if (user) {
            const manager = user.get('is_staff');
            if (!manager) {
                next(new ErrorHandler('Forbidden', 403));
            }
        }
        // @ts-ignore
        const { email, name, surname } = await model.User.findOne({ where: { id } });
        await emailService.sendMail(email, 'ACCOUNT_BLOCKED', { userName: name, surname });
        return model.User.update({ is_active: false }, { where: { id } });
    }

    async userUnlocked(id: number, userEmail: string, next: NextFunction) {
        const user = await model.User.findOne({ where: { email: userEmail } });
        if (user) {
            const manager = user.get('is_staff');
            if (!manager) {
                next(new ErrorHandler('Forbidden', 403));
            }
        }
        // @ts-ignore
        const { email, name, surname } = await model.User.findOne({ where: { id } });
        await emailService.sendMail(email, 'ACCOUNT_UNLOCKED', { userName: name, surname });
        return model.User.update({ is_active: true }, { where: { id } });
    }

    async activateUser(activateToken: string, next: NextFunction) {
        const token = await model.Token.findOne({ where: { activateToken } });
        if (!token) {
            next(new ErrorHandler('Not Found', 404));
        }
        const id = token?.userId;
        await model.User.update({ is_active: true }, { where: { id } });
        await model.Token.update({ activateToken: `User ${id} activated` }, { where: { userId: id } });
    }

    private static async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}
export const userService = new UserService();
