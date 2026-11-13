const Joi = require('joi');

const shipIdSchema = Joi.string().hex().min(24).required();

function validateShipId(req, res, next) {
  const { error, value } = shipIdSchema.validate(req.params.id);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.params.id = value;
  return next();
}

module.exports = validateShipId;
