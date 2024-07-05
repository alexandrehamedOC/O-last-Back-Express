import ApiError from "../errors/api.errors.js";


const validationMiddleware = (schema) => {
  return (req, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new ApiError(error.details[0].message, { status: 400 }));
    }
    next();
  };
};

export default validationMiddleware;
