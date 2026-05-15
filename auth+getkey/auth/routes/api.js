const express = require('express');
const router = express.Router();
const License = require('../models/License');
const App = require('../models/App');
const User = require('../models/User');
const Log = require('../models/Log');
const KeyRequest = require('../models/KeyRequest');
const crypto = require('crypto');
const axios = require('axios'); // We need axios for API calls

// Helper to sign response for anti-crack
const signResponse = (data) => {
    const secret = process.env.SIGNATURE_KEY || 'default_secret';
    const payload = JSON.stringify(data);
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
};

// Middleware to protect admin routes with Rate Limiting
const adminAuth = async (req, res, next) => {
    const password = req.body.adminPassword || req.body.password;
    const adminPass = process.env.ADMIN_PASSWORD;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Check if IP is blocked (5 failures in 30 mins)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const failedAttempts = await Log.countDocuments({
        type: 'admin_login_fail',
        ip: ip,
        timestamp: { $gte: thirtyMinutesAgo }
    });

    if (failedAttempts >= 5) {
        return res.status(429).json({ 
            success: false, 
            message: 'IP cua ban da bi khoa 30 phut do nhap sai qua nhieu lan!' 
        });
    }

    if (password && adminPass && password.trim() === adminPass.trim()) {
        next();
    } else {
        await Log.create({ type: 'admin_login_fail', ip, timestamp: new Date() });
        const remaining = 5 - (failedAttempts + 1);
        res.status(401).json({ 
            success: false, 
            message: `Xac thuc Admin that bai! Ban con ${remaining} lan thu truoc khi bi khoa IP.` 
        });
    }
};

// ==========================================
// 0. ADMIN API: Đăng nhập giao diện Web
// ==========================================
router.post('/admin/login', adminAuth, (req, res) => {
    res.json({ success: true, message: 'Dang nhap thanh cong' });
});

// ==========================================
// 1. ADMIN API: Quản lý Licenses
// ==========================================
router.post('/admin/licenses/list', adminAuth, async (req, res) => {
    const licenses = await License.find().populate('appId', 'name').sort({ createdAt: -1 });
    res.json({ success: true, licenses });
});

router.post('/admin/create-key', adminAuth, async (req, res) => {
    const { customKey, days, level, appId, maxDevices } = req.body;

    const generateSegment = () => crypto.randomBytes(2).toString('hex').toUpperCase();
    const newKey = customKey ? customKey : `${generateSegment()}-${generateSegment()}-${generateSegment()}-${generateSegment()}`;

    try {
        const license = new License({
            key: newKey,
            days: days || 30,
            level: level || 1,
            hwids: [],
            maxDevices: maxDevices || 1,
            appId: appId || null,
            isUsed: false,
            expiryDate: null
        });
        await license.save();
        res.json({ success: true, key: newKey, message: 'Tạo Key thành công!' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post('/admin/licenses/delete', async (req, res) => {
    if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) return res.status(403).json({ success: false });
    await License.findByIdAndDelete(req.body.licenseId);
    res.json({ success: true });
});

// ==========================================
// 2. CLIENT API: Đăng nhập (App-Specific API)
// ==========================================
router.post('/client/verify', async (req, res) => {
    const { appId, secret, key, username, password, hwid } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (!appId || !secret) {
        return res.status(400).json({ success: false, message: 'Thieu App ID hoac Secret!' });
    }

    try {
        // 1. Xác thực App
        const app = await App.findById(appId);
        if (!app) return res.status(404).json({ success: false, message: 'App khong ton tai!' });
        if (app.secret !== secret) return res.status(401).json({ success: false, message: 'Secret App khong hop le!' });

        await Log.create({ type: 'api_hit', ip, app: app.name, appId: app._id });

        if (!hwid) return res.status(400).json({ success: false, message: 'Thieu HWID thiet bi!' });

        // 2. Xử lý Login bằng KEY
        if (key) {
            const license = await License.findOne({ key, appId });
            if (!license) return res.status(404).json({ success: false, message: 'Key khong ton tai cho App nay!' });

            // Lần đầu sử dụng
            if (!license.isUsed) {
                let daysNum = parseInt(license.days) || 30;
                if (daysNum > 365000) daysNum = 365000; // Giới hạn 1000 năm cho an toàn

                const newExpiry = new Date(Date.now() + daysNum * 24 * 60 * 60 * 1000);

                license.isUsed = true;
                license.hwids = [hwid];
                license.expiryDate = newExpiry;

                await license.save();
                await Log.create({ type: 'auth_success', key, app: app.name, appId: app._id, ip });
                return res.json({ success: true, message: 'Kich hoat thanh cong!', expiry: newExpiry, level: license.level });
            }

            // Kiểm tra hết hạn
            if (new Date() > license.expiryDate) return res.status(403).json({ success: false, message: 'Key da het han!' });

            // Kiểm tra HWID
            if (!license.hwids.includes(hwid)) {
                if (license.hwids.length < (license.maxDevices || 1)) {
                    license.hwids.push(hwid);
                    await license.save();
                } else {
                    return res.status(403).json({ success: false, message: 'Vuot qua so thiet bi cho phep!' });
                }
            }

            await Log.create({ type: 'auth_success', key, app: app.name, appId: app._id, ip });
            const responseData = { success: true, message: 'Dang nhap thanh cong!', expiry: license.expiryDate, level: license.level };
            return res.json({ ...responseData, signature: signResponse(responseData) });
        }

        // 3. Xử lý Login bằng Username/Password
        if (username && password) {
            const user = await User.findOne({ username, password, appId });
            if (!user) return res.status(404).json({ success: false, message: 'Tai khoan hoac mat khau khong dung!' });

            // Lần đầu sử dụng
            if (!user.isUsed) {
                let daysNum = parseInt(user.days) || 30;
                if (daysNum > 365000) daysNum = 365000; // Giới hạn 1000 năm

                const newExpiry = new Date(Date.now() + daysNum * 24 * 60 * 60 * 1000);

                user.isUsed = true;
                user.hwids = [hwid];
                user.expiryDate = newExpiry;

                await user.save();
                await Log.create({ type: 'auth_success', username, app: app.name, appId: app._id, ip });
                return res.json({ success: true, message: 'Kich hoat tai khoan thanh cong!', expiry: newExpiry });
            }

            // Kiểm tra hết hạn
            if (new Date() > user.expiryDate) return res.status(403).json({ success: false, message: 'Tai khoan da het han!' });

            // Kiểm tra HWID
            if (!user.hwids.includes(hwid)) {
                if (user.hwids.length < (user.maxDevices || 1)) {
                    user.hwids.push(hwid);
                    await user.save();
                } else {
                    return res.status(403).json({ success: false, message: 'Vuot qua so thiet bi cho phep!' });
                }
            }

            await Log.create({ type: 'auth_success', username, app: app.name, appId: app._id, ip });
            const responseData = { success: true, message: 'Dang nhap thanh cong!', expiry: user.expiryDate };
            return res.json({ ...responseData, signature: signResponse(responseData) });
        }

        return res.status(400).json({ success: false, message: 'Vui long cung cap Key hoac Tai khoan!' });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
    }
});

// ==========================================
// 2.1. CLIENT API: Get Key via Link4M
// ==========================================

// Endpoint 1: Create Link4M URL
router.get('/client/get-key-link', async (req, res) => {
    let { appId } = req.query;

    try {
        // Nếu không có appId truyền vào, tự động tìm App có tên là 'cshellvn'
        if (!appId) {
            const defaultApp = await App.findOne({ name: /cshellvn/i });
            if (defaultApp) appId = defaultApp._id;
        }

        if (!appId) {
            return res.status(400).json({ success: false, message: 'Thieu App ID! Vui long tao App ten cshellvn trong Admin.' });
        }

        // Tạo token tạm thời
        const token = crypto.randomBytes(16).toString('hex');
        await KeyRequest.create({ token, appId });

        // 3. Rút gọn link qua Link4M
        const callbackUrl = `${req.protocol}://${req.get('host')}/api/client/verify-key?token=${token}`;
        const link4mApiKey = process.env.LINK4M_API_KEY;
        
        if (!link4mApiKey) {
            // Nếu chưa cấu hình API Key thì trả về link trực tiếp (cho dev test)
            return res.json({ 
                success: true, 
                hasKey: false, 
                link: callbackUrl, 
                message: 'Vui long vuot link de lay Key (Dev Mode: Link truc tiep)' 
            });
        }

        // Gọi API Link4M để rút gọn (Sử dụng domain .co theo tài liệu)
        try {
            console.log(`[Link4M] Attempting to shorten: ${callbackUrl}`);
            const response = await axios.get(`https://link4m.co/api-shorten/v2?api=${link4mApiKey}&url=${encodeURIComponent(callbackUrl)}`);
            
            if (response.data && response.data.status === 'success') {
                return res.json({ 
                    success: true, 
                    hasKey: false, 
                    link: response.data.shortenedUrl, 
                    message: 'Vui lòng vượt link để lấy Key!' 
                });
            } else {
                console.error('[Link4M] API Error Response:', response.data);
                throw new Error(response.data.message || 'Link4M trả về lỗi');
            }
        } catch (apiErr) {
            console.error('[Link4M] Request Failed:', apiErr.message);
            return res.json({ 
                success: false, 
                message: `Lỗi Link4M: ${apiErr.message}` 
            });
        }

    } catch (err) {
        res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
    }
});

// Endpoint 2: Callback from Link4M to issue the key
router.get('/client/verify-key', async (req, res) => {
    const { token } = req.query;

    if (!token) return res.status(400).send('Token không hợp lệ!');

    try {
        // 1. Tìm yêu cầu lấy key
        const request = await KeyRequest.findOne({ token });
        
        if (!request) {
            return res.send('Yêu cầu lấy Key không tồn tại hoặc đã hết hạn!');
        }

        // 2. Nếu đã hoàn thành rồi thì hiện luôn key cũ
        if (request.status === 'completed' && request.generatedKey) {
            return res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>GET KEY SUCCESS</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
                    <style>
                        body { background: #0b0b0b; color: #fff; font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
                        .card { background: #161616; padding: 40px; border-radius: 20px; text-align: center; border: 1px solid #333; max-width: 400px; width: 90%; }
                        h1 { color: #fff; margin-bottom: 10px; }
                        .key-box { background: #000; border: 2px dashed #00ff88; padding: 15px; color: #00ff88; font-family: monospace; font-size: 20px; border-radius: 10px; margin: 20px 0; }
                        .btn { background: #00ff88; color: #000; padding: 12px 25px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block; cursor: pointer; }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <h1>GET KEY THÀNH CÔNG!</h1>
                        <p>Key của bạn có thời hạn 24 giờ:</p>
                        <div class="key-box" id="key">${request.generatedKey}</div>
                        <button class="btn" onclick="navigator.clipboard.writeText('${request.generatedKey}'); alert('Đã copy key!')">SAO CHÉP KEY</button>
                        <p style="font-size: 12px; color: #666; margin-top: 20px;">Hãy quay lại Tool và nhập Key này để sử dụng.</p>
                    </div>
                </body>
                </html>
            `);
        }

        // 3. Nếu đang chờ thì mới tạo key mới
        const newKey = "FREE-" + crypto.randomBytes(4).toString('hex').toUpperCase() + "-" + crypto.randomBytes(4).toString('hex').toUpperCase();
        
        const license = new License({
            key: newKey,
            days: 1,
            level: 1,
            hwids: [], 
            maxDevices: 1,
            appId: request.appId,
            isUsed: false, 
            expiryDate: null
        });

        await license.save();

        // Cập nhật trạng thái và lưu key lại
        request.status = 'completed';
        request.generatedKey = newKey;
        await request.save();

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>GET KEY SUCCESS</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
                <style>
                    body { background: #0b0b0b; color: #fff; font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
                    .card { background: #161616; padding: 40px; border-radius: 20px; text-align: center; border: 1px solid #333; max-width: 400px; width: 90%; }
                    h1 { color: #fff; margin-bottom: 10px; }
                    .key-box { background: #000; border: 2px dashed #00ff88; padding: 15px; color: #00ff88; font-family: monospace; font-size: 20px; border-radius: 10px; margin: 20px 0; }
                    .btn { background: #00ff88; color: #000; padding: 12px 25px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block; cursor: pointer; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>GET KEY THÀNH CÔNG!</h1>
                    <p>Key của bạn có thời hạn 24 giờ:</p>
                    <div class="key-box" id="key">${newKey}</div>
                    <button class="btn" onclick="navigator.clipboard.writeText('${newKey}'); alert('Đã copy key!')">SAO CHÉP KEY</button>
                    <p style="font-size: 12px; color: #666; margin-top: 20px;">Hãy quay lại Tool và nhập Key này để sử dụng.</p>
                </div>
            </body>
            </html>
        `);

    } catch (err) {
        res.status(500).send('Lỗi server: ' + err.message);
    }
});

// ==========================================
// 3. ADMIN API: Reset HWID
// ==========================================
router.post('/admin/reset-hwid', adminAuth, async (req, res) => {
    const { key } = req.body;

    try {
        const license = await License.findOne({ key });
        if (license) {
            license.hwids = [];
            await license.save();
            return res.json({ success: true, message: 'Reset HWID Key thành công!' });
        }
        res.status(404).json({ success: false, message: 'Không tìm thấy Key' });
    } catch (err) { res.status(500).json({ success: false, message: 'Lỗi server' }); }
});

// ==========================================
// 4. ADMIN API: Dashboard Stats
// ==========================================
router.post('/admin/stats', adminAuth, async (req, res) => {

    try {
        const totalApps = await App.countDocuments();
        const totalLicenses = await License.countDocuments();
        const totalUsers = await User.countDocuments();

        const licenseHwidAgg = await License.aggregate([
            { $project: { hwidCount: { $size: { $ifNull: ["$hwids", []] } } } },
            { $group: { _id: null, total: { $sum: "$hwidCount" } } }
        ]);
        const devicesFromLicenses = licenseHwidAgg.length > 0 ? licenseHwidAgg[0].total : 0;

        const userHwidAgg = await User.aggregate([
            { $project: { hwidCount: { $size: { $ifNull: ["$hwids", []] } } } },
            { $group: { _id: null, total: { $sum: "$hwidCount" } } }
        ]);
        const devicesFromUsers = userHwidAgg.length > 0 ? userHwidAgg[0].total : 0;

        const totalDevices = devicesFromLicenses + devicesFromUsers;
        const liveFeed = await Log.find({ type: 'auth_success' }).sort({ timestamp: -1 }).limit(5);

        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const trafficLogs = await Log.aggregate([
            { $match: { type: 'api_hit', timestamp: { $gte: yesterday } } },
            { $group: { _id: { $hour: "$timestamp" }, count: { $sum: 1 } } },
            { $sort: { "_id": 1 } }
        ]);

        res.json({ success: true, totalApps, totalLicenses, totalUsers, totalDevices, liveFeed, trafficLogs });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ==========================================
// 5. ADMIN API: Quản lý Apps
// ==========================================
router.post('/admin/apps/list', adminAuth, async (req, res) => {
    const apps = await App.find().sort({ createdAt: 1 });
    res.json({ success: true, apps });
});
router.post('/admin/apps/create', adminAuth, async (req, res) => {
    try {
        const secret = crypto.randomBytes(20).toString('hex');
        const app = await App.create({ name: req.body.name, version: req.body.version || '1.0.0', secret });
        res.json({ success: true, app });
    } catch (err) {
        console.error('App Create Error:', err);
        res.status(500).json({ success: false, message: 'Lỗi server khi tạo App: ' + err.message });
    }
});
router.post('/admin/apps/delete', adminAuth, async (req, res) => {
    await App.findByIdAndDelete(req.body.appId);
    res.json({ success: true });
});

// ==========================================
// 6. ADMIN API: Quản lý Users
// ==========================================
router.post('/admin/users/list', adminAuth, async (req, res) => {
    const users = await User.find().populate('appId', 'name').sort({ createdAt: -1 });
    res.json({ success: true, users });
});
router.post('/admin/users/create', adminAuth, async (req, res) => {
    try {
        const { username, password, days, maxDevices, appId } = req.body;
        const user = await User.create({ username, password, days, maxDevices, appId });
        res.json({ success: true, user });
    } catch (err) { res.json({ success: false, message: err.message }); }
});
router.post('/admin/users/delete', adminAuth, async (req, res) => {
    await User.findByIdAndDelete(req.body.userId);
    res.json({ success: true });
});
router.post('/admin/users/reset-hwid', adminAuth, async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (user) {
        user.hwids = [];
        await user.save();
    }
    res.json({ success: true });
});

// ==========================================
// 7. ADMIN API: Quản lý Sessions
// ==========================================
router.post('/admin/sessions/list', adminAuth, async (req, res) => {
    const logs = await Log.find({ type: 'auth_success' }).sort({ timestamp: -1 }).limit(100);
    res.json({ success: true, logs });
});

module.exports = router;
