export const flatYupValidationError = (err) => {
  const errorObject = err.inner.reduce((acc, currentError) => {
    acc[currentError.path] = currentError.message;
    return acc;
  }, {});

  return errorObject;
};
