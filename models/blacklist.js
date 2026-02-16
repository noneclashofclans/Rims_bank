const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [ true, "Token is required to blacklist" ],
        unique: [ true, "Token is already blacklisted" ]
    },
    timestamp: true
})

blackListSchema.index( {createdAt: 1} ), {
    expiresAfterSeconds: 60*60*24*2
}

const blacklistModel = mongoose.model('blacklist', blackListSchema);

module.exports = blacklistModel;