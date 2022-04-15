const Joi = require('joi');

const schema = () => {
  return Joi.object({
    name: Joi.string().min(2).required().messages({
      'string.min': `نام باید حداقل 2 کاراکتر باشد`,
      'string.empty': `وارد کردن نام الزامی است`,
      'string.required': `وارد کردن نام الزامی است`
    }),
    username: Joi.string().min(4).max(32).regex(/^(?=.{4,32}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/).required().messages({
      'string.min': `نام کاربری باید حداقل 4 کاراکتر باشد`,
      'string.max': `نام کاربری باید حداکثر 32 کاراکتر باشد`,
      'string.regex.base': `نام کاربری باید شامل حروف انگلیسی و اعداد و کاراکتر های _ و . باشد`,
      'string.pattern.base': `نام کاربری باید شامل حروف انگلیسی و اعداد و کاراکتر های _ و . باشد`,
      'string.empty': `وارد کردن نام کاربری الزامی است`,
      'string.required': `وارد کردن نام کاربری الزامی است`
    }),
    email: Joi.string().email().required().messages({
      'string.email': `ایمیل وارد شده معتبر نمی باشد`,
      'string.empty': `وارد کردن ایمیل الزامی است`,
      'string.required': `وارد کردن ایمیل الزامی است`
    }),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/).required().messages({
      'string.regex.base': `رمز عبور باید شامل حروف انگلیسی و اعداد باشد و حداقل 8 کاراکتر باشد`,
      'string.pattern.base': `رمز عبور باید شامل حروف انگلیسی و اعداد باشد و حداقل 8 کاراکتر باشد`,
      'string.empty': `وارد کردن رمز عبور الزامی است`,
      'string.required': `وارد کردن رمز عبور الزامی است`
    }),
    // TODO: add recaptcha
  })
};

module.exports = schema;