const Joi = require('joi');

const shipSchema = Joi.object({
  name: Joi.string().min(3).required().trim(),
  type: Joi.string().min(3).required().trim(),
});

function validateShip(req, res, next) {
  const { error, value } = shipSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.body = value;
  return next();
}

module.exports = validateShip;
