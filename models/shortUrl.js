const mongoose = require('mongoose');
const shortId = require('shortid');

const shortURLSchema = new mongoose.Schema({
    fullURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true,
        default: shortId.generate
    },
    creationTime: {
        type: Date,
        required: true,
        default: new Date()
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('ShortUrl', shortURLSchema);