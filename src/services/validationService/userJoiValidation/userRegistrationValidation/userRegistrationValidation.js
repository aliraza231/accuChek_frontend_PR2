import  Joi  from "joi-browser";


const userRegistrationValidationSchema = {
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(3).max(30).required(),
    country: Joi.string().min(3).max(20).required(),
    language: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required(),
    confirm_password: Joi.string().min(3).max(20).required(),
    points: Joi.string().min(0).max(100).required
};
export default userRegistrationValidationSchema;