const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB connected successfully');
        })
        .catch (err => {
            console.log('MoongoDB connection error', err);
            process.exit(1);
        })
}

module.exports = connectToDB;