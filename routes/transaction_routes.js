const { Router } = require('express');
const authMiddleware = require('../middleware/auth_middleware');
const transactionController = require("../controllers/transaction_controller")

const transactionRoutes = Router();


transactionRoutes.post("/", authMiddleware.authMiddleware, transactionController.create_transaction_controller)

transactionRoutes.post("/system/initial-funds", authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransaction)

module.exports = transactionRoutes;
