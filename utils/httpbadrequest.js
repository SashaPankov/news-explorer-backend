const { HTTP_BAD_REQUEST } = require("./errors");

module.exports = class HTTPBadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = "HTTPBadRequest";
    this.statusCode = HTTP_BAD_REQUEST;
  }
};
