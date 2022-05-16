import bcrypt from 'bcrypt';
import { IUser } from '../interfaces';
import { config } from '../config/config';
import { model } from '../models/models';

class UserService {
    async createUser(user: IUser): Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this._hashPassword(password);
        const newUser = await model.User.create({ ...user, password: hashedPassword });
        const id = newUser.get('id');
        await model.Basket.create({ userId: id });
        return user;
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}
export const userService = new UserService();
