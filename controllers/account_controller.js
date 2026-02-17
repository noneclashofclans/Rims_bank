const accountModel = require("../models/account");

const create_account_controller = async (req, res) => {
    const user = req.user;

    const account = await accountModel.create({
        user: user._id
    })

    res.status(201).json({
        account
    })
}

const get_user_account_controller = async(req, res) => {
    const account = await accountModel.findOne({user: req.user._id});

    res.status(200).json({
        account
    })
}

const get_account_balance_controller = async(req, res) => {
    const {accountId} = req.params;

    const account = await accountModel.findOne({
        _id: accountId,
        user: req.user._id
    })


    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }

    const balance = await account.getBalance();

    res.status(200).json({
        accountId: account._id,
        balance: balance
    })

}

module.exports = {
    create_account_controller,
    get_user_account_controller,
    get_account_balance_controller
}