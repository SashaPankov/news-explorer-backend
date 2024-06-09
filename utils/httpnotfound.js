const { HTTP_NOT_FOUND } = require("./errors");

module.exports = class HTTPNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "HTTPNotFound";
    this.statusCode = HTTP_NOT_FOUND;
  }
};
