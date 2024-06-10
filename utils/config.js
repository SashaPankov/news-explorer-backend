const { NODE_ENV, JWT_SECRET_KEY } = process.env;

module.exports.JWT_SECRET =
  NODE_ENV === "production" ? JWT_SECRET_KEY : "SECRETSMILE";
