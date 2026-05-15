const mongoose = require('mongoose');

const KeyRequestSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    hwid: { type: String }, // Optional now
    appId: { type: mongoose.Schema.Types.ObjectId, ref: 'App', required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    generatedKey: { type: String }, // Store the key here after generation
    createdAt: { type: Date, default: Date.now, expires: 3600 } // Token expires in 1 hour
});

module.exports = mongoose.model('KeyRequest', KeyRequestSchema);
