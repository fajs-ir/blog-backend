const Joi = require('joi');

const schema = () => {
  return Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': `ایمیل وارد شده معتبر نمی باشد`,
      'string.empty': `وارد کردن ایمیل الزامی است`,
      'string.required': `وارد کردن ایمیل الزامی است`
    }),
    code: Joi.string().length(6).required().messages({
      'string.length': `کد وارد شده باید شامل 6 کاراکتر باشد`,
      'string.empty': `وارد کردن کد الزامی است`,
      'string.required': `وارد کردن کد الزامی است`
    }),
  })
};

module.exports = schema;