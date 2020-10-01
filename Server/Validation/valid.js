const { addQuestion } = require('./schema')


module.exports = {
    addQuestionValidation: async(req, res, next) => {
        const value = await addQuestion.validate(req.body);
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    }

}