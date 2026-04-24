function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  const isProduction = process.env.NODE_ENV === "production";

  res.status(statusCode).json({
    status: statusCode,
    message: err.message || "Internal Server Error",
    details: err.details,
    stack: isProduction ? undefined : err.stack,
  });
}

module.exports = { errorHandler, notFound };
