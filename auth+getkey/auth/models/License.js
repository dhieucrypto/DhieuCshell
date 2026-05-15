const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    hwids: { type: [String], default: [] }, // Array of HWIDs for multi-device support
    maxDevices: { type: Number, default: 1 },
    level: { type: Number, default: 1 },
    days: { type: Number, required: true, default: 30 },
    expiryDate: { type: Date, default: null },
    isUsed: { type: Boolean, default: false },
    appId: { type: mongoose.Schema.Types.ObjectId, ref: 'App' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('License', LicenseSchema);
