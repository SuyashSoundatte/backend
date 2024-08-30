const router = require("express").Router();
const { signup, login } = require("../controllers/auth.controller");
const {signupValidations, loginValidations} = require("../middlewares/auth.middlewares") 

router.post("/signup", signupValidations, signup)

router.post("/login", loginValidations, login)

module.exports = router;