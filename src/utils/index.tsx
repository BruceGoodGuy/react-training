import { ValidationError } from "yup";

export function formatYupErrors(yupError: ValidationError): any {
  let errors = {};
  if (!yupError.inner || yupError.inner.length === 0) {
    return {
      [yupError.path || "unknown"]: yupError.message,
    };
  }

  yupError.inner.forEach((error) => {
    if (error.path) {
      errors = {
        ...errors,
        [error.path]: error.message,
      };
    } else {
      errors = {
        ...errors,
        unknown: error.message,
      };
    }
  });

  return errors;
}
