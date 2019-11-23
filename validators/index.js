const Joi = require("@hapi/joi");
const fileValidator = require("./fileValidator");

module.exports = {
  validateBody: schema => (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.sendBadRequest(result.error);
    }

    next();
  },
  schemas: {
    fileValidator
  }
};
