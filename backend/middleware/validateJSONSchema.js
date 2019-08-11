const { validate } = require('jsonschema');

//middleware for server side validation => will take in a JSONSchema as parameter and validate user input against it
function validateJSONSchema(jsonSchema) {
  return function(req, res, next) {
    const result = validate(req.body, jsonSchema);
    if (!result.valid) {
      next(result.errors.map(error => error.stack));
    }
    next();
  };
}

module.exports = validateJSONSchema;
