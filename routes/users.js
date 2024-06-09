const router = require("express").Router();
const { getUserById } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth, getUserById);

module.exports = router;
