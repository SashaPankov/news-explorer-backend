const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const Errors = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const HTTPConflictError = require("../utils/httpconflicterror");
const HTTPBadRequest = require("../utils/httpbadrequest");

module.exports.getUserById = (req, res, next) => {
  user
    .findById(req.user._id)
    .orFail(() => {
      throw new Errors.HTTPNotFound(`User with id ${req.user._id} not found`);
    })
    .then((validUser) => res.send({ data: validUser }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new HTTPBadRequest(`Invalid User Id: ${req.user._id}.`));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  console.log(req.body);
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      user.create({ email, name, password: hash }).then((validUser) =>
        res.send({
          _id: validUser._id,
          email: validUser.email,
          name: validUser.name,
        })
      )
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new HTTPBadRequest(Errors.defaultBadRequestMessage));
      } else if (
        err.name === "MongoServerError" &&
        err.code === Errors.MONGODB_DUPLICATE_ERROR
      ) {
        next(new HTTPConflictError(`e-mail ${email} is alredy exists.`));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return user
    .findUserByCredentials(email, password)
    .then((validUser) => {
      const token = jwt.sign({ _id: validUser._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new HTTPBadRequest(Errors.defaultBadRequestMessage));
      } else {
        next(err);
      }
    });
};
