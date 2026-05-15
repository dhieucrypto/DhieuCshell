const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    days: { type: Number, required: true, default: 30 },
    expiryDate: { type: Date, default: null },
    isUsed: { type: Boolean, default: false },
    maxDevices: { type: Number, default: 1 },
    hwids: { type: [String], default: [] },
    appId: { type: mongoose.Schema.Types.ObjectId, ref: 'App' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
