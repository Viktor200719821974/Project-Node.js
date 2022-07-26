import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { Op } from 'sequelize';
import {IPaginationResponse, ITokenActivate, IUser} from '../interfaces';
import { config } from '../config/config';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';
import { emailService } from './emailService';

class UserService {
    async getAll(page: number, offset: number, limit: number, email: string)
        : Promise<IPaginationResponse<IUser>> {
        let user;
        if (email) {
            user = await model.User.findAndCountAll({
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt'],
                },
                limit,
                offset,
                order: [['id', 'DESC']],
                where: {
                    email: {
                        [Op.like]: `%${email}%`,
                    },
                },
            });
        }
        if (!email) {
            user = await model.User.findAndCountAll({
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt'],
                },
                limit,
                offset,
                order: [['id', 'DESC']],
            });
        }
        // @ts-ignore
        const { rows, count } = user;
        return {
            page,
            perPage: limit,
            rows,
            count,
        };
    }

    async getOne(id: number): Promise<IUser | null> {
        return model.User.findOne({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
            where: { id },
            include: [{ model: model.Basket, as: 'basket' }],
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
        const { id } = newUser;
        Number(id);
        // @ts-ignore
        await model.Basket.create({ userId: id });
        return user;
    }

    // async updateUser(id: string, user: IUser): Promise<IUser | null> {
    //     await model.User.update(
    //         {
    //             ...user,
    //         },
    //         {
    //             where: { id },
    //         },
    //     );
    //     return model.User.findByPk(id);
    // }

    async deleteUser(id:string) {
        const tokenActivate = await model.TokenActivate.findOne({ where: { userId: id } });
        if (tokenActivate) {
            await model.TokenActivate.destroy({ where: { userId: id } });
        }
        return model.User.destroy({ where: { id } });
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        return model.User.findOne({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
            where: { email },
        }).then((data) => data);
    }

    async userManager(id: number): Promise<IUser | null> {
        await model.User.update({ is_staff: true }, { where: { id } });
        return model.User.findByPk(id);
    }

    async userIsNotManager(id: number): Promise<IUser | null> {
        await model.User.update({ is_staff: false }, { where: { id } });
        return model.User.findByPk(id);
    }

    async userBlocked(id: number): Promise<IUser | null> {
        // @ts-ignore
        const { email, name, surname } = await model.User.findOne({ where: { id } });
        await emailService.sendMail(email, 'ACCOUNT_BLOCKED', { userName: name, surname });
        await model.User.update({ is_active: false }, { where: { id } });
        return model.User.findByPk(id);
    }

    async userUnlocked(id: number): Promise<IUser | null> {
        // @ts-ignore
        const { email, name, surname } = await model.User.findOne({ where: { id } });
        await emailService.sendMail(email, 'ACCOUNT_UNLOCKED', { userName: name, surname });
        await model.User.update({ is_active: true }, { where: { id } });
        return model.User.findByPk(id);
    }

    async activateUser(activateToken: string, next: NextFunction) {
        const tokenUserId = await model.TokenActivate.findOne({ where: { activateToken } })
            .then((data: ITokenActivate | null) => data?.userId);
        if (!tokenUserId) {
            next(new ErrorHandler('Not Found', 404));
        }
        // const id = token?.userId;
        await model.User.update({ is_active: true }, { where: { id: tokenUserId } });
        await model.TokenActivate.destroy({ where: { userId: tokenUserId } });
    }

    private static async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}
export const userService = new UserService();
