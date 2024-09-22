const express = require("express");
const UserController = require("../controller/AuthController");
const authMiddleware = require("../middleware/middleware");
const router = express.Router();


router.post("/register" , UserController.register);
router.post("/login" , UserController.login);
router.post("/forget" , UserController.forgetPassword);

module.exports = router;