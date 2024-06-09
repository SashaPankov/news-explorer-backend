const { HTTP_CONFLICT } = require("./errors");

module.exports = class HTTPConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "HTTPConflictError";
    this.statusCode = HTTP_CONFLICT;
  }
};
