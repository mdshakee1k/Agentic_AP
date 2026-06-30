function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: error.message || "Internal server error",
      code: error.code || "INTERNAL_ERROR",
      details: error.details || {}
    }
  });
}

module.exports = errorHandler;
