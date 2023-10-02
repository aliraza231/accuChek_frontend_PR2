import  Joi  from "joi-browser";

const adminAddProductValidationSchema = {
    title: Joi.string().min(3).max(50).required(),
    id: Joi.number().min(0).max(9999).required(),
    description: Joi.string().min(5).max(500).required(),
    points: Joi.number().min(0).max(9999).required(),
    category: Joi.string().min(1).max(20).required(),
    image: Joi.string()
};

export default adminAddProductValidationSchema;