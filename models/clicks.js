const mongoose = require('mongoose');

const clicksSchema = new mongoose.Schema({
    shortURL: {
        type: String,
        required: true,
    },
    clickedTime: {
        type: Date,
        required: true,
        default: new Date()
    }
});

module.exports = mongoose.model('clicks', clicksSchema);