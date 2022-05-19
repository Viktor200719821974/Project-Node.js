import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { IUser } from '../interfaces';
import { config } from '../config/config';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';

class UserService {
    async getAll() {
        return model.User.findAll();
    }

    async getOne(id: number) {
        return model.User.findOne({
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

    async updateUser(id: string, user: IUser) {
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

    private static async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}
export const userService = new UserService();
