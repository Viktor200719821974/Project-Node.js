import Joi from 'joi';
import { commonValidator } from './commonValidator';

export const validators = {
    registration: Joi.object({
        email: commonValidator.emailValidator.messages({ 'any.only': 'Email not valid' }),
        password: Joi.string().required().trim().min(4)
            .messages({ 'any.only': 'Password is not valid, no space' }),
        name: Joi.string().required().alphanum().min(2)
            .messages({ 'any.only': 'Name is not valid, min 2, az, AZ and 0-9' }),
        surname: Joi.string().required().alphanum().min(2)
            .messages({ 'any.only': 'Surname is not valid, min 2, az, AZ and 0-9' }),
        age: Joi.number().required().greater(17).messages({ 'any.only': 'Age is not valid must be less 18 years old' }),
        phone: commonValidator.phoneValidator.messages({ 'any.only': 'Phone is not valid' }),
    }),
    device: Joi.object({
        name: Joi.string().required().trim().min(2)
            .messages({ 'any.only': 'Name is not valid, no space and min 2' }),
        color: Joi.string().required().trim().min(2)
            .messages({ 'any.only': 'Color is not valid, no space and min 2' }),
        width: Joi.number().required().greater(0)
            .messages({ 'any.only': 'Width is not valid, min 1' }),
        height: Joi.number().required().greater(0)
            .messages({ 'any.only': 'Height is not valid, min 1' }),
        depth: Joi.number().required().greater(0)
            .messages({ 'any.only': 'Depth is not valid, min 1' }),
        price: Joi.number().required().greater(0)
            .messages({ 'any.only': 'Price is not valid, min 1' }),
        brandId: Joi.number().required().messages({ 'any.only': 'BrandId is not valid' }),
        typeId: Joi.number().required().messages({ 'any.only': 'TypeId is not valid' }),
        info: Joi.string(),
    }),
    type: Joi.object({
        name: Joi.string().required().min(2)
            .messages({ 'any.only': 'Name is not valid, min 2, az, AZ, ая, АЯ and 0-9' }),
    }),
    brand: Joi.object({
        name: Joi.string().required().min(2)
            .messages({ 'any.only': 'Name is not valid, min 2, az, AZ, ая, АЯ and 0-9' }),
    }),
    rating: Joi.object({
        deviceId: Joi.number().required().messages({ 'any.only': 'DeviceId is not valid' }),
        rate: Joi.number().required().messages({ 'any.only': 'Rate is not valid' }),
        comment: Joi.string().max(150).empty('')
            .messages({ 'any.only': 'Comment is not valid, max 150' }),
    }),
    deviceInfo: Joi.object({
        title: Joi.string().max(30).messages({ 'any.only': 'Title is not valid, max 30' }),
        description: Joi.string().max(30).messages({ 'any.only': 'Description is not valid, max 30' }),
    }),
    order: Joi.object({
        type: Joi.string(),
        city: Joi.string().min(2)
            .messages({ 'any.only': 'City is not valid, min 2' }),
        street: Joi.string().min(2)
            .messages({ 'any.only': 'Street is not valid, min 2' }),
        house: Joi.number().greater(0)
            .messages({ 'any.only': 'House is not valid, min 1' }),
        room: Joi.number().greater(0)
            .messages({ 'any.only': 'Room is not valid, min 1' }),
        comment: Joi.string().max(150)
            .messages({ 'any.only': 'Comment is not valid, max 150' }),
        department: Joi.number().greater(0)
            .messages({ 'any.only': 'Department is not valid, min 1' }),
    }),
};
