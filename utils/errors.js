const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_FORBIDDEN = 403;
const HTTP_NOT_FOUND = 404;
const HTTP_CONFLICT = 409;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const defaultServerErrorMessage = "An error has occurred on the server.";
const defaultBadRequestMessage =
  "The request could not be understood due to incorrect syntax and need to be modified.";
const MONGODB_DUPLICATE_ERROR = 11000;

module.exports = {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_FORBIDDEN,
  HTTP_UNAUTHORIZED,
  HTTP_CONFLICT,
  defaultServerErrorMessage,
  defaultBadRequestMessage,
  MONGODB_DUPLICATE_ERROR,
};
