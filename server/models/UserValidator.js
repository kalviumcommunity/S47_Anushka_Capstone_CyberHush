const Joi = require('joi');

// Joi schema for registration
const registrationSchema = Joi.object({
    Firstname: Joi.string().required(),
    Lastname: Joi.string().required(),
    Email: Joi.string().email().required(),
    Password: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.string().required()
});

// Joi schema for login
const loginSchema = Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string().required()
});

module.exports = { registrationSchema, loginSchema };
