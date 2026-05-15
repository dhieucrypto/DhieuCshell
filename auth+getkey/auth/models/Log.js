const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    type: { type: String, enum: ['api_hit', 'auth_success'], required: true },
    key: { type: String }, 
    username: { type: String }, // For user login
    ip: { type: String },  
    app: { type: String },
    appId: { type: mongoose.Schema.Types.ObjectId, ref: 'App' },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', LogSchema);
