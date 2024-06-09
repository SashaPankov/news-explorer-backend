const { HTTP_INTERNAL_SERVER_ERROR } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  console.error(
    "Error Name = %s Message=%s Code=%d",
    err.name,
    err.message,
    err.statusCode,
  );
  const { statusCode = HTTP_INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === HTTP_INTERNAL_SERVER_ERROR
        ? "An error occurred on the server"
        : message,
  });
};
