const router = require("express").Router();
const user = require("./users");
const article = require("./articles");
const { createUser, login } = require("../controllers/users");
const {
  validateUserLogin,
  validateUserInfoBody,
} = require("../middlewares/validation");
const HTTPNotFound = require("../utils/httpnotfound");

router.use("/users", user);
router.use("/signin", validateUserLogin, login);
router.use("/signup", validateUserInfoBody, createUser);
router.use("/articles", article);

router.use(() => {
  throw new HTTPNotFound("Requested resource not found");
});

module.exports = router;
