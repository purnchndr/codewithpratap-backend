const AppError = require('./appError');

function catchRouteError(err, req, res, next) {
  console.error(err.message);
  res.status(err.statusCode || 500).json({
    message: err.message || err.stack || 'Something went wrong',
    statuscode: err.statusCode || 500,
    result: false,
  });
}
function undefinedRoute(req, res, next) {
  const error = `Invalid path or parameter, ${req.url}`;
  throw new AppError(404, error);
}

function catchAsync(fun) {
  return async (req, res, next) =>
    await fun(req, res, next).catch(err => {
      console.error(err);
      next(err);
    });
}

module.exports = { catchRouteError, undefinedRoute, catchAsync };
