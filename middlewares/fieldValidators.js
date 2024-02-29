import { validationResult } from "express-validator";

export const validateFields = (request, response, next) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).send({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};
