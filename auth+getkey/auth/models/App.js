const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
    name: { type: String, required: true },
    version: { type: String, default: '1.0.0' },
    secret: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('App', AppSchema);
