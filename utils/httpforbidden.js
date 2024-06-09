const { HTTP_FORBIDDEN } = require("./errors");

module.exports = class HTTPForbidden extends Error {
  constructor(message) {
    super(message);
    this.name = "HTTPForbidden";
    this.statusCode = HTTP_FORBIDDEN;
  }
};
