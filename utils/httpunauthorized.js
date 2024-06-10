const { HTTP_UNAUTHORIZED } = require("./errors");

module.exports = class HTTPUnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "HTTPUnauthorizedError";
    this.statusCode = HTTP_UNAUTHORIZED;
  }
};
