function catchRouteError(err, req, res, next) {
  console.error(err.message);
  res.status(err.statusCode || 500).json({
    message: err.message || err.stack || 'Something went wrong',
    status: err.status || 'failed',
    statuscode: err.statusCode || 500,
  });
}
function undefinedRoute(req, res, next) {
  const error = `Invalid path or parameter, ${req.url}`;
  res.status(404).json({ message: error, result: false });
}

function catchAsync(fun) {
  return async (req, res, next) =>
    await fun(req, res, next).catch(err => {
      console.error(err.message);
      next(err);
    });
}

module.exports = { catchRouteError, undefinedRoute, catchAsync };
