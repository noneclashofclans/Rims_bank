const express = require("express");
const authMiddleware = require("../middleware/auth_middleware");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.post('/', authMiddleware.authentication_middleware, accountController.create_account_controller);

router.get("/", authMiddleware.authMiddleware, accountController.get_user_account_controller);


router.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.get_account_balance_controller);

module.exports = router;
