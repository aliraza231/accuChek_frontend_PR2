import  Joi  from "joi-browser";

let adminAddCourseValidationSchema = {
    name: Joi.string().min(3).max(100).required(),
    id: Joi.number().integer().min(1).required(),
    discription: Joi.string().min(10).required(),
    points: Joi.number().integer().min(1).required(),
    status: Joi.string().min(3).required(),
    duration: Joi.string().min(3).required(),
    url: Joi.string().min(3).required(),
    image: Joi.string().min(200).required(),
};

export default adminAddCourseValidationSchema;