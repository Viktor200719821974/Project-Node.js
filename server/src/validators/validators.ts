import Joi from 'joi';
import { commonValidator } from './commonValidator';

export const validators = {
    registration: Joi.object({
        email: commonValidator.emailValidator.error(new Error('Email not valid')),
        password: Joi.string().required().trim().min(8)
            .error(new Error('Password is not valid, no space, min 8')),
        name: Joi.string().required().alphanum().min(2)
            .error(new Error('Name is not valid, min 2, az, AZ and 0-9')),
        surname: Joi.string().required().alphanum().min(2)
            .error(new Error('Surname is not valid, min 2, az, AZ and 0-9')),
        age: Joi.number().required().greater(17).error(new Error('Age is not valid must be less 18 years old')),
        phone: commonValidator.phoneValidator.messages({ 'any.only': 'Phone is not valid' }),
    }),
    device: Joi.object({
        name: Joi.string().required().trim().min(2)
            .error(new Error('Name is not valid, no space and min 2')),
        color: Joi.string().required().trim().min(2)
            .error(new Error('Color is not valid, no space and min 2')),
        width: Joi.number().required().greater(0).error(new Error('Width is not valid, min 1')),
        height: Joi.number().required().greater(0).error(new Error('Height is not valid, min 1')),
        depth: Joi.number().required().greater(0).error(new Error('Depth is not valid, min 1')),
        price: Joi.number().required().greater(0).error(new Error('Price is not valid, min 1')),
        brandId: Joi.number().required().error(new Error('BrandId is not valid')),
        typeId: Joi.number().required().error(new Error('TypeId is not valid')),
        info: Joi.string(),
    }),
    type: Joi.object({
        name: Joi.string().required().min(2).error(new Error('Name is not valid, min 2, az, AZ, ая, АЯ and 0-9')),
    }),
    brand: Joi.object({
        name: Joi.string().required().min(2).error(new Error('Name is not valid, min 2, az, AZ, ая, АЯ and 0-9')),
    }),
    rating: Joi.object({
        deviceId: Joi.number().required().error(new Error('DeviceId is not valid')),
        rate: Joi.number().required().max(5).error(new Error('Rate is not valid, max 5')),
        comment: Joi.string().max(150).empty('').error(new Error('Comment is not valid, max 150')),
    }),
    deviceInfo: Joi.object({
        title: Joi.string().max(30).error(new Error('Title is not valid, max 30')),
        description: Joi.string().max(30).error(new Error('Description is not valid, max 30')),
    }),
    order: Joi.object({
        type: Joi.string(),
        city: Joi.string().min(2).error(new Error('City is not valid, min 2')),
        street: Joi.string().min(2).error(new Error('Street is not valid, min 2')),
        house: Joi.number().greater(0).error(new Error('House is not valid, min 1')),
        room: Joi.number().greater(0).error(new Error('Room is not valid, min 1')),
        comment: Joi.string().max(150).empty('').error(new Error('Comment is not valid, max 150')),
        department: Joi.number().greater(0).error(new Error('Department is not valid, min 1')),
        typePay: Joi.string().required().error(new Error('Виберіть спосіб оплати')),
    }),
};
// .messages({ 'any.only': '' }),
