const { validate, ValidationError, Joi } = require('express-validation')

const schema = {
    addQuestion: Joi.object({
        examCode: Joi.string().required(),
        subCode: Joi.string().required(),
        question: Joi.string().required(),
        mode: Joi.string().required(),
        sequence: Joi.string().required(),
        qsequence: Joi.string().required(),
        correctOptionId: Joi.string().required(),
        options: Joi.array().items(
            Joi.object({
                id: Joi.number().required(),
                text: Joi.string().required(),
                AOA: Joi.string().required()
            })
        )

    })

}
module.exports = schema;