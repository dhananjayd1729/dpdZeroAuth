const express = require("express");

const UserController = require("../controllers/user-controller");
const { validateUserAuth } = require("../middlewares/auth-validity");

const router = express.Router();

router.post("/register", UserController.create);
router.post(
    "/token", 
    validateUserAuth,
    UserController.generateToken);

module.exports = router;