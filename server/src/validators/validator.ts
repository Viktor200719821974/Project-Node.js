import Joi from 'joi';
import { commonValidator } from './commonValidator';

export const registrationValidator = {
    registration: Joi.object({
        email: commonValidator.emailValidator.message('Email not valid'),
        password: Joi.string().required().trim().min(4)
            .message('Password not valid, no space'),
        name: Joi.string().required().alphanum().min(2)
            .message('Name is not valid, min 2, az, AZ and 0-9'),
        surname: Joi.string().required().alphanum().min(2)
            .message('Surname is not valid, min 2, az, AZ and 0-9'),
        age: Joi.number().required().greater(18).message('Age is not valid must be less 18 years old'),
        phone: commonValidator.phoneValidator.message('Phone not valid'),
    }),
};
// export const deviceValidator = {
//     device: Joi.object({
//         name: Joi.string().required().trim().min(2)
//             .message('Name not valid, no space and min 2'),
//         price: Joi.number().required().greater(1)
//             .message('Price not valid, min 1'),
//         brandId: Joi.number().required().message('BrandId is not valid'),
//         typeId: Joi.number().required().message('TypeId is not valid'),
//     }),
// };
// export const typeValidator = {
//     type: Joi.object({
//         name: Joi.string().required().alphanum().min(2)
//             .message('Name is not valid, min 2, az, AZ and 0-9'),
//     }),
// };
// export const brandValidator = {
//     brand: Joi.object({
//         name: Joi.string().required().alphanum().min(2)
//             .message('Name is not valid, min 2, az, AZ and 0-9'),
//     }),
// };
// export const ratingValidator = {
//     rating: Joi.object({
//         userId: Joi.number().required().message('UserId is not valid'),
//         rate: Joi.number().required().message('Rate is not valid'),
//         comment: Joi.string().required().alphanum().max(150)
//             .message('Comment is not valid, max 150'),
//     }),
// };
