import  Joi  from "joi-browser";

const adminSigninSchema = {
    email: Joi.string().email().min(5).max(100).required(),
    password: Joi.string().min(8).max(100).required(),
};

export default adminSigninSchema;