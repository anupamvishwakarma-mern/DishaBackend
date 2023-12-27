const joi = require('@hapi/joi')

const authSchema = joi.object({
    // id: joi.string().required(),
    name: joi.string().uppercase(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(8).required()
})


module.exports = { authSchema };