const express = require("express")
const authController = require("../controllers/authController")

const router = express.Router()


router.post("/register", authController.user_registration_controller);


router.post("/login", authController.user_login_controller);

router.post("/logout", authController.userLogoutController);


module.exports = router;