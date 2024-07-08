import ApiError from "../errors/api.errors.js";


const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new ApiError(error.details[0].message, 400, 'BAD_REQUEST'));
    }
    next();
  };
};

export default validationMiddleware;
