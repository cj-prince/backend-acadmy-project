const { Joi } = require('express-validation');

module.exports = {
    vSignUpStudents: {
        body: Joi.object({
            fastname: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().min().required(),
            phone: Joi.string(),
            address: Joi.string(),
        })
    },
    vLogin: {
        body: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().min().required()
        })
    }
}