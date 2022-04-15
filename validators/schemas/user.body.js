const Joi = require('joi');

const schema = () => {
  return Joi.object({
    name: Joi.string().min(2).messages({
      'string.min': `نام باید حداقل 2 کاراکتر باشد`,
      'string.empty': `وارد کردن نام الزامی است`,
      'string.required': `وارد کردن نام الزامی است`
    }),
    username: Joi.string().min(4).max(32).regex(/^(?=.{4,32}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/).messages({
      'string.min': `نام کاربری باید حداقل 4 کاراکتر باشد`,
      'string.max': `نام کاربری باید حداکثر 32 کاراکتر باشد`,
      'string.regex.base': `نام کاربری باید شامل حروف انگلیسی و اعداد و کاراکتر های _ و . باشد`,
      'string.pattern.base': `نام کاربری باید شامل حروف انگلیسی و اعداد و کاراکتر های _ و . باشد`,
      'string.empty': `وارد کردن نام کاربری الزامی است`,
      'string.required': `وارد کردن نام کاربری الزامی است`
    }),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/).messages({
      'string.regex.base': `رمز عبور باید شامل حروف انگلیسی و اعداد باشد و حداقل 8 کاراکتر باشد`,
      'string.pattern.base': `رمز عبور باید شامل حروف انگلیسی و اعداد باشد و حداقل 8 کاراکتر باشد`,
      'string.empty': `وارد کردن رمز عبور الزامی است`,
      'string.required': `وارد کردن رمز عبور الزامی است`
    }),
    // currentPassword comes is required only when updating user's password
    currentPassword: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/).xor('password').messages({
      'string.regex.base': `رمز عبور باید شامل حروف انگلیسی و اعداد باشد و حداقل 8 کاراکتر باشد`,
      'string.pattern.base': `رمز عبور باید شامل حروف انگلیسی و اعداد باشد و حداقل 8 کاراکتر باشد`,
      'string.empty': `وارد کردن رمز عبور الزامی است`,
      'string.required': `وارد کردن رمز عبور الزامی است`,
      'string.xor': `رمز عبور فعلی برای تغییر رمز عبور الزامی است`
    }),
    bio: Joi.string().max(128).messages({
      'string.max': `توضیحات باید حداکثر 128 کاراکتر باشد`,
      'string.empty': `وارد کردن توضیحات الزامی است`,
      'string.required': `وارد کردن توضیحات الزامی است`
    }),
    notifications: Joi.object({
      admin: Joi.boolean().messages({
        'boolean.base': `وضعیت اطلاع رسانی باید به صورت صحیح باشد`,
      }),
      follow: Joi.boolean().messages({
        'boolean.base': `وضعیت اطلاع رسانی باید به صورت صحیح باشد`,
      }),
      like: Joi.boolean().messages({
        'boolean.base': `وضعیت اطلاع رسانی باید به صورت صحیح باشد`,
      }),
      comment: Joi.boolean().messages({
        'boolean.base': `وضعیت اطلاع رسانی باید به صورت صحیح باشد`,
      }),
    }).messages({
      'object.base': `وضعیت اطلاع رسانی باید به صورت صحیح باشد`,
      'object.allowUnknown': `وضعیت اطلاع رسانی باید به صورت صحیح باشد`
    }),
    socialMedia: Joi.object({
      facebook: Joi.string().uri().messages({
        'string.uri': `آدرس فیسبوک باید به صورت صحیح باشد`,
      }),
      twitter: Joi.string().uri().messages({
        'string.uri': `آدرس توییتر باید به صورت صحیح باشد`,
      }),
      instagram: Joi.string().uri().messages({
        'string.uri': `آدرس اینستاگرام باید به صورت صحیح باشد`,
      }),
      linkedin: Joi.string().uri().messages({
        'string.uri': `آدرس لینکدین باید به صورت صحیح باشد`,
      }),
      youtube: Joi.string().uri().messages({
        'string.uri': `آدرس یوتیوب باید به صورت صحیح باشد`,
      }),
      github: Joi.string().uri().messages({
        'string.uri': `آدرس گیت‌هاب باید به صورت صحیح باشد`,
      }),
      gitlab: Joi.string().uri().messages({
        'string.uri': `آدرس گیت‌لب باید به صورت صحیح باشد`,
      }),
      bitbucket: Joi.string().uri().messages({
        'string.uri': `آدرس بیت‌بک‌تک باید به صورت صحیح باشد`,
      }),
      website: Joi.string().uri().messages({
        'string.uri': `آدرس وبسایت باید به صورت صحیح باشد`,
      }),
      other: Joi.string().uri().messages({
        'string.uri': `آدرس سایر سایت ها باید به صورت صحیح باشد`,
      }),
    }).messages({
      'object.base': `آدرس سایت ها باید به صورت صحیح باشد`,
      'object.allowUnknown': `آدرس سایت ها باید به صورت صحیح باشد`
    }),
  })
};

module.exports = schema;