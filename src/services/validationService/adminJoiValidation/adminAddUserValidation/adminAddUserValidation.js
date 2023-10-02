import  Joi  from "joi-browser";

const adminAddUserValidationSchema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(10).max(100).required(),
    password: Joi.string().min(8).max(100).required(),
    country: Joi.string().min(1).max(100).required(),
    language: Joi.string().min(1).max(100).required(),
    confirm_password: Joi.string().min(8).max(100).required(),
};

export default adminAddUserValidationSchema;