const Joi = require('joi');

const schema = () => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    // TODO: add recaptcha
  })
};

module.exports = schema;