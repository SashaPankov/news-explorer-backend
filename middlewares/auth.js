const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const HTTPUnauthorizedError = require("../utils/httpunauthorized");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new HTTPUnauthorizedError("Authorization Required");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new HTTPUnauthorizedError("Authorization Required"));
  }

  req.user = payload;

  next();
};
