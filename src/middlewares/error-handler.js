export const errorHandler = async (err, req, res, next) => {
  if (err) {
    if (!err.statusCode) {err.statusCode = 500} 
    return res.status(err.statusCode).send({
      error: err.message || err.errors[0].msg
    })
  }
  next();
}