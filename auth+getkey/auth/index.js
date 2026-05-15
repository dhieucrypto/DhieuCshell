require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set('bufferCommands', false);

// MongoDB Connection Logic for Serverless (Optimized)
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
            console.log('✅ MongoDB Connected (Cached)');
            return mongoose;
        });
    }
    
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
};

// Middleware to connect to DB only for API routes
app.use('/api', async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ success: false, message: 'Database Connection Error: ' + err.message });
    }
});

// Routes
app.use('/api', require('./routes/api'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public'), {
    extensions: ['html']
}));

// Root route redirect to login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Status endpoint
app.get('/api/status', (req, res) => {
    res.json({
        name: "Auth CSHELLVN",
        developer: "Dinh Duc Hieu",
        status: "Running",
        dbStatus: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
    });
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

module.exports = app;
