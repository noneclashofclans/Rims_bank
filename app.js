const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Welcome to Rims Bank API");
})

// using the routes
const authRouter = require("./routes/auth_routes")
const accountRouter = require("./routes/accountRoutes")
const transactionRoutes = require("./routes/transaction_routes")

app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/transaction", transactionRoutes);

module.exports = app;