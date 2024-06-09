const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      "string.empty": 'The "keyword" field must be filled in',
    }),
    title: Joi.string().required().messages({
      "string.empty": 'The "title" field must be filled in',
    }),
    text: Joi.string().required().messages({
      "string.empty": 'The "text" field must be filled in',
    }),
    date: Joi.string().required().messages({
      "string.empty": 'The "date" field must be filled in',
    }),
    source: Joi.string().required().messages({
      "string.empty": 'The "source" field must be filled in',
    }),
    link: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "link" field must be filled in',
      "string.uri": 'the "link" field must be a valid url',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "image" field must be filled in',
      "string.uri": 'the "image" field must be a valid url',
    }),
  }),
});

module.exports.validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().length(24).hex(),
  }),
});
