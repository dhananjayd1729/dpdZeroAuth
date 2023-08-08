const express = require("express");

const UserController = require("../controllers/user-controller");
const { validateUserAuth } = require("../middlewares/auth-validity");

const router = express.Router();

router.post("/register", UserController.create);
router.post(
    "/token", 
    validateUserAuth,
    UserController.generateToken
    );
router.post("/data", UserController.createData);
router.get("/data/:key", UserController.retrieveKey);
router.put("/data/:key", UserController.updateValue);

module.exports = router;