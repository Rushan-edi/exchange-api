var Joi = require('joi');

module.exports = {
    /**
     * @returns validation status
     * @param {*} data 
     */
    convertValidation: function (data) {
        const schema = Joi.object({
            fromCurrency: Joi.string()
                .required(),
            toCurrency: Joi.string()
                .required(),
            amount: Joi.number()
                .required()
                .integer(),
        })
        return schema.validate(data)
    }
}