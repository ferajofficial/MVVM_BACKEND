const express = require("express");
const userController = require("../controllers/user_controller");
const router = express.Router();

router.get("/users", userController.getAllUsers);
router.post("/signup", userController.signup);
router.post("/login", userController.login);



module.exports = router;
