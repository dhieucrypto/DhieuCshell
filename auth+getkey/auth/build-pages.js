const fs = require('fs');
const path = require('path');

const head = (title) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auth CSHELLVN - ${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #03050a; color: #fff; margin: 0; overflow: hidden; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .glass-panel { background: rgba(14, 18, 28, 0.75); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.06); border-radius: 1.2rem; box-shadow: 0 10px 40px rgba(0,0,0,0.4); transition: border-color 0.3s; }
        .glass-panel:hover { border-color: rgba(59,130,246,0.3); }
        .input-dark { background: rgba(8, 10, 15, 0.8); border: 1px solid rgba(255,255,255,0.08); color: white; transition: all 0.3s; }
        .input-dark:focus { border-color: #3b82f6; outline: none; box-shadow: 0 0 0 2px rgba(59,130,246,0.2); }
        .btn-primary { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; transition: all 0.3s; box-shadow: 0 4px 15px rgba(37,99,235,0.2); }
        .btn-primary:hover { box-shadow: 0 6px 25px rgba(37,99,235,0.4); transform: translateY(-2px); }
        .sidebar-item { color: #8b949e; transition: all 0.2s; border-left: 3px solid transparent; }
        .sidebar-item:hover { color: #fff; background: linear-gradient(90deg, rgba(255,255,255,0.03), transparent); }
        .sidebar-item.active { color: #60a5fa; background: linear-gradient(90deg, rgba(59,130,246,0.1), transparent); border-left-color: #3b82f6; }
        .table-header th { font-size: 0.65rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.15em; padding: 1.5rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: left; }
        .table-row { border-bottom: 1px solid rgba(255,255,255,0.02); transition: all 0.2s; }
        .table-row:hover { background: rgba(255,255,255,0.03); transform: scale(1.002); }
        .table-row td { padding: 1.5rem 1rem; font-size: 0.85rem; color: #cbd5e1; vertical-align: middle; }
        .badge-active { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); font-size: 0.65rem; padding: 0.25rem 0.6rem; border-radius: 0.4rem; font-weight: 700; letter-spacing: 0.05em; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2d3748; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #4a5568; }
        .bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.3; pointer-events: none; }
        .orb-1 { width: 500px; height: 500px; background: #3b82f6; top: -150px; left: -150px; }
        .orb-2 { width: 400px; height: 400px; background: #8b5cf6; bottom: -100px; right: 5%; }
    </style>
</head>
<body class="h-screen w-full flex flex-col relative">
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
`;

const sidebar = (activeId) => `
    <script>if(!sessionStorage.getItem('adminPass')) window.location.href = 'index.html';</script>
    <div class="flex h-screen w-full overflow-hidden relative z-10">
        <aside class="w-64 border-r border-white/5 bg-[#03050a]/80 backdrop-blur-xl flex flex-col shrink-0 shadow-2xl">
            <div class="h-20 flex items-center px-8 border-b border-white/5">
                <div class="flex items-center gap-3 font-extrabold text-lg text-white tracking-tight">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/40 text-white text-lg">A</div>
                    Auth CSHELLVN
                </div>
            </div>
            <div class="flex-1 overflow-y-auto py-8">
                <div class="px-8 text-[0.6rem] font-bold text-gray-500 uppercase tracking-widest mb-3">Main Dashboard</div>
                <a href="dashboard.html" class="sidebar-item ${activeId === 'dashboard' ? 'active' : ''} flex items-center px-8 py-3 text-sm font-semibold mb-1"><span class="mr-4 text-xl opacity-80">⌂</span> Dashboard</a>
                <a href="apps.html" class="sidebar-item ${activeId === 'apps' ? 'active' : ''} flex items-center px-8 py-3 text-sm font-semibold mb-1"><span class="mr-4 text-xl opacity-80">📦</span> Apps</a>
                <a href="users.html" class="sidebar-item ${activeId === 'users' ? 'active' : ''} flex items-center px-8 py-3 text-sm font-semibold mb-1"><span class="mr-4 text-xl opacity-80">👥</span> Users</a>
                <a href="licenses.html" class="sidebar-item ${activeId === 'licenses' ? 'active' : ''} flex items-center px-8 py-3 text-sm font-semibold mb-1"><span class="mr-4 text-xl opacity-80">🔑</span> Licenses</a>
                <div class="px-8 text-[0.6rem] font-bold text-gray-500 uppercase tracking-widest mb-3 mt-8">Monitoring</div>
                <a href="session.html" class="sidebar-item ${activeId === 'session' ? 'active' : ''} flex items-center px-8 py-3 text-sm font-semibold mb-1"><span class="mr-4 text-xl opacity-80">⏱️</span> Sessions</a>
            </div>
            <div class="p-6 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div class="flex items-center gap-4">
                    <img src="" id="sidebarAvatar" onclick="changeAvatar()" title="Change Avatar" class="w-10 h-10 rounded-xl cursor-pointer hover:scale-105 transition object-cover border border-white/10 shadow-lg">
                    <div>
                        <div class="text-sm font-bold text-white tracking-wide">hieudinhduc</div>
                        <div class="text-[0.65rem] text-emerald-400 font-bold tracking-widest">⚡ PRO PLAN</div>
                    </div>
                </div>
                <button onclick="logout()" class="text-gray-500 hover:text-red-400 bg-white/5 p-2.5 rounded-xl hover:bg-red-500/10 transition shadow-sm" title="Logout">⍈</button>
            </div>
        </aside>

        <main class="flex-1 flex flex-col min-w-0 bg-[#0a0d14]/30 backdrop-blur-3xl">
            <header class="h-20 border-b border-white/5 flex items-center justify-between px-10 shrink-0 bg-[#03050a]/40">
                <div class="text-xs text-gray-400 font-bold flex items-center tracking-widest uppercase">
                    Platform <span class="mx-3 opacity-30">></span> <span class="text-blue-400">${activeId.toUpperCase()}</span>
                </div>
                <div class="flex items-center gap-6">
                    <img src="" id="topbarAvatar" class="w-9 h-9 rounded-full border border-white/10 object-cover cursor-pointer hover:scale-105 transition shadow-md" onclick="changeAvatar()">
                </div>
            </header>
            <div class="flex-1 overflow-y-auto p-10" id="main-scroll">
`;

const foot = `
            </div>
        </main>
    </div>
    <script>
        function changeAvatar() {
            const url = prompt("Nhập link ảnh Avatar mới của bạn (URL):");
            if(url && url.trim() !== '') {
                localStorage.setItem('cshellvn_avatar', url.trim());
                loadAvatar();
            }
        }
        function loadAvatar() {
            const savedAvatar = localStorage.getItem('cshellvn_avatar') || "https://ui-avatars.com/api/?name=DH&background=2563eb&color=fff";
            document.getElementById('sidebarAvatar').src = savedAvatar;
            document.getElementById('topbarAvatar').src = savedAvatar;
        }
        function logout() {
            sessionStorage.removeItem('adminPass');
            window.location.href = 'index.html';
        }
        document.addEventListener('DOMContentLoaded', loadAvatar);
    </script>
</body>
</html>
`;

const loginContent = `
    <div class="flex w-full h-full relative z-50">
        <div class="hidden lg:flex w-1/2 border-r border-white/5 flex-col items-center justify-center relative backdrop-blur-3xl bg-[#03050a]/50">
            <div class="text-center max-w-lg z-10 p-10">
                <div class="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2rem] mx-auto mb-10 flex items-center justify-center shadow-[0_0_80px_rgba(37,99,235,0.4)]">
                    <span class="text-6xl font-extrabold text-white drop-shadow-lg">A</span>
                </div>
                <h1 class="text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Auth CSHELLVN</h1>
                <p class="text-gray-400 text-xl mb-12 leading-relaxed font-light">The next generation of secure authentication & licensing infrastructure.</p>
                <div class="flex justify-center gap-6">
                    <div class="glass-panel px-6 py-4 rounded-2xl border-white/5 bg-white/[0.02]">
                        <div class="text-2xl font-black text-white">99.9%</div>
                        <div class="text-[0.65rem] text-gray-500 font-bold tracking-widest mt-1 uppercase">Uptime</div>
                    </div>
                    <div class="glass-panel px-6 py-4 rounded-2xl border-white/5 bg-white/[0.02]">
                        <div class="text-2xl font-black text-white">5M+</div>
                        <div class="text-[0.65rem] text-gray-500 font-bold tracking-widest mt-1 uppercase">API Calls</div>
                    </div>
                </div>
            </div>
            <div class="absolute inset-0" style="background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 40px 40px;"></div>
        </div>
        <div class="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-[#0a0d14]/40 backdrop-blur-2xl">
            <div class="w-full max-w-sm glass-panel p-10 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <h2 class="text-3xl font-extrabold mb-2 relative z-10 tracking-tight">Welcome Back</h2>
                <p class="text-gray-400 text-sm mb-8 relative z-10">Sign in to your admin dashboard</p>
                <form id="loginForm" onsubmit="handleLogin(event)" class="space-y-6 relative z-10">
                    <div>
                        <label class="block text-[0.7rem] font-bold text-gray-400 mb-2 uppercase tracking-widest">Username</label>
                        <input type="text" value="admin" class="w-full input-dark rounded-xl px-5 py-3.5 text-sm font-semibold" readonly>
                    </div>
                    <div>
                        <label class="block text-[0.7rem] font-bold text-gray-400 mb-2 uppercase tracking-widest">Password</label>
                        <input type="password" id="password" class="w-full input-dark rounded-xl px-5 py-3.5 text-sm font-semibold" placeholder="••••••••" required>
                    </div>
                    <button type="submit" class="w-full btn-primary font-bold py-4 rounded-xl mt-8 flex items-center justify-center gap-2 text-sm tracking-wide" id="loginBtn">
                        Access Dashboard &rarr;
                    </button>
                </form>
                <p id="loginError" class="text-red-400 text-xs mt-6 text-center hidden bg-red-500/10 py-3 rounded-xl border border-red-500/20 font-bold tracking-wide relative z-10"></p>
            </div>
        </div>
    </div>
    <script>
        if(sessionStorage.getItem('adminPass')) window.location.href = 'dashboard.html';
        async function handleLogin(e) {
            e.preventDefault();
            const btn = document.getElementById('loginBtn');
            const err = document.getElementById('loginError');
            const pass = document.getElementById('password').value;
            btn.innerHTML = 'Authenticating...';
            err.classList.add('hidden');
            try {
                const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pass }) });
                const data = await res.json();
                if(data.success) { sessionStorage.setItem('adminPass', pass); window.location.href = 'dashboard.html'; } 
                else { err.innerText = data.message || 'ACCESS DENIED: INCORRECT PASSWORD'; err.classList.remove('hidden'); }
            } catch (error) { err.innerText = 'CONNECTION ERROR'; err.classList.remove('hidden'); }
            btn.innerHTML = 'Access Dashboard &rarr;';
        }
    </script>
`;

const dashboardContent = `
    <div class="max-w-7xl mx-auto animate-[fadeIn_0.4s_ease-out]">
        <div class="flex justify-between items-end mb-10">
            <div>
                <h1 class="text-4xl font-extrabold text-white mb-2 tracking-tight">Intelligence</h1>
                <p class="text-sm text-gray-400 font-medium">Real-time oversight for your applications.</p>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div class="lg:col-span-2 glass-panel p-8">
                <div class="flex items-center gap-4 mb-8">
                    <div class="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(59,130,246,0.15)]">📈</div>
                    <div>
                        <h3 class="text-sm font-bold text-white uppercase tracking-widest">API Traffic</h3>
                        <p class="text-xs text-gray-500 font-medium">Execution intelligence over 24h</p>
                    </div>
                </div>
                <div class="h-64 w-full relative">
                    <canvas id="trafficChart"></canvas>
                </div>
            </div>
            <div class="glass-panel p-8 flex flex-col h-full">
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h3 class="text-sm font-bold text-white uppercase tracking-widest">Live Feed</h3>
                        <p class="text-xs text-gray-500 font-medium">Recent authentications</p>
                    </div>
                    <span class="badge-active shadow-[0_0_15px_rgba(16,185,129,0.3)]">● LIVE</span>
                </div>
                <div class="space-y-4 flex-1" id="liveFeedContainer">
                    <div class="text-gray-500 text-sm text-center py-10 font-medium animate-pulse">Waiting for logins...</div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="glass-panel p-8 flex items-center gap-6 hover:-translate-y-1 transition cursor-default">
                <div class="text-blue-400 text-4xl opacity-90 drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]">📱</div>
                <div><div class="text-[0.65rem] text-gray-400 font-bold tracking-widest mb-1">TOTAL APPS</div><div class="text-3xl font-black" id="stat-apps">0</div></div>
            </div>
            <div class="glass-panel p-8 flex items-center gap-6 hover:-translate-y-1 transition cursor-default">
                <div class="text-purple-400 text-4xl opacity-90 drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">🔑</div>
                <div><div class="text-[0.65rem] text-gray-400 font-bold tracking-widest mb-1">LICENSES</div><div class="text-3xl font-black" id="stat-licenses">0</div></div>
            </div>
            <div class="glass-panel p-8 flex items-center gap-6 hover:-translate-y-1 transition cursor-default">
                <div class="text-emerald-400 text-4xl opacity-90 drop-shadow-[0_0_25px_rgba(16,185,129,0.6)]">👥</div>
                <div><div class="text-[0.65rem] text-gray-400 font-bold tracking-widest mb-1">USERS</div><div class="text-3xl font-black" id="stat-users">0</div></div>
            </div>
            <div class="glass-panel p-8 flex items-center gap-6 hover:-translate-y-1 transition cursor-default">
                <div class="text-pink-400 text-4xl opacity-90 drop-shadow-[0_0_25px_rgba(236,72,153,0.6)]">💻</div>
                <div><div class="text-[0.65rem] text-gray-400 font-bold tracking-widest mb-1">DEVICES</div><div class="text-3xl font-black" id="stat-devices">0</div></div>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const adminPass = sessionStorage.getItem('adminPass');
            if(!adminPass) return;
            
            try {
                const res = await fetch('/api/admin/stats', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({adminPassword: adminPass})
                });
                const data = await res.json();
                if(data.success) {
                    document.getElementById('stat-apps').innerText = data.totalApps;
                    document.getElementById('stat-licenses').innerText = data.totalLicenses;
                    document.getElementById('stat-users').innerText = data.totalUsers;
                    document.getElementById('stat-devices').innerText = data.totalDevices;

                    const feed = document.getElementById('liveFeedContainer');
                    if(data.liveFeed && data.liveFeed.length > 0) {
                        feed.innerHTML = '';
                        data.liveFeed.forEach(log => {
                            const timeAgo = Math.floor((new Date() - new Date(log.timestamp))/60000);
                            const timeStr = timeAgo < 1 ? 'Just now' : (timeAgo < 60 ? timeAgo + 'm ago' : Math.floor(timeAgo/60) + 'h ago');
                            feed.innerHTML += \`<div class="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition bg-white/[0.02]"><div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg shadow-[0_0_20px_rgba(16,185,129,0.2)]">✓</div><div class="flex-1"><div class="text-sm font-bold text-white">\${log.key.substring(0,8)}... Logged in</div><div class="text-xs text-gray-500 font-medium mt-0.5">\${log.app} app</div></div><div class="text-right"><div class="text-xs text-blue-400 font-bold">\${timeStr}</div></div></div>\`;
                        });
                    } else { feed.innerHTML = '<div class="text-gray-500 text-sm text-center py-10 font-medium">No recent logins...</div>'; }

                    const chartData = Array(24).fill(0);
                    const currentHour = new Date().getHours();
                    data.trafficLogs.forEach(log => { chartData[log._id] = log.count; });
                    
                    const displayData = []; const displayLabels = [];
                    for(let i=11; i>=0; i--) {
                        let h = (currentHour - i + 24) % 24;
                        displayLabels.push(h + ':00'); displayData.push(chartData[h]);
                    }

                    const ctx = document.getElementById('trafficChart').getContext('2d');
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)'); gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: displayLabels,
                            datasets: [{ label: 'API Calls', data: displayData, borderColor: '#3b82f6', backgroundColor: gradient, borderWidth: 4, pointBackgroundColor: '#03050a', pointBorderColor: '#3b82f6', pointRadius: 5, pointHoverRadius: 8, fill: true, tension: 0.4 }]
                        },
                        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false, min: 0 }, x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#8b949e', font: { size: 11, family: 'Inter', weight: 'bold' } } } } }
                    });
                }
            } catch(e) { console.error('Failed to load stats'); }
        });
    </script>
`;

const appsContent = `
    <div class="max-w-7xl mx-auto h-full flex flex-col animate-[fadeIn_0.4s_ease-out]">
        <div class="flex justify-between items-end mb-10 shrink-0">
            <div>
                <h1 class="text-4xl font-extrabold text-white mb-2 tracking-tight">Applications</h1>
                <p class="text-sm text-gray-400 font-medium">Deploy and monitor application endpoints.</p>
            </div>
            <button onclick="openNewAppModal()" class="btn-primary px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 transition hover:-translate-y-1">+ New App</button>
        </div>
        <div class="flex flex-col md:flex-row gap-10 flex-1 min-h-0">
            <div class="w-full md:w-80 shrink-0 flex flex-col gap-4">
                <input type="text" id="appSearchInput" placeholder="Search apps..." class="w-full input-dark px-5 py-3.5 text-sm rounded-xl mb-2 font-bold tracking-wide" onkeyup="filterApps()">
                <div id="appsList" class="space-y-4 overflow-y-auto flex-1 pr-2 pb-20">
                    <!-- Dynamic Apps List -->
                </div>
            </div>
            <div class="flex-1 overflow-y-auto pr-4 pb-10" id="appDetailsPanel" style="display: none;">
                <div class="flex items-center justify-between gap-5 mb-10">
                    <div class="flex items-center gap-5">
                        <h2 class="text-4xl font-extrabold text-white tracking-tight" id="detailAppName">cshellvn</h2>
                        <span class="badge-active text-xs px-3 py-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">● ACTIVE</span>
                    </div>
                    <button onclick="deleteCurrentApp()" class="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-5 py-2.5 rounded-xl border border-red-500/30 font-bold uppercase tracking-widest transition shadow-[0_0_15px_rgba(239,68,68,0.15)]">Delete App</button>
                </div>
                <div class="glass-panel p-10 mb-10 space-y-8">
                    <div class="grid grid-cols-2 gap-10">
                        <div>
                            <div class="text-[0.7rem] text-gray-500 font-bold tracking-widest mb-3 uppercase">App Name</div>
                            <div class="input-dark px-6 py-4 rounded-xl text-base font-mono font-bold text-white bg-black/40" id="detailAppLabelName">cshellvn</div>
                        </div>
                        <div>
                            <div class="text-[0.7rem] text-gray-500 font-bold tracking-widest mb-3 uppercase">Version</div>
                            <div class="input-dark px-6 py-4 rounded-xl text-base font-mono font-bold text-white bg-black/40" id="detailAppVersion">1.0.0</div>
                        </div>
                    </div>
                    <div>
                        <div class="text-[0.7rem] text-gray-500 font-bold tracking-widest mb-3 uppercase">Integration Secret</div>
                        <div onclick="copySecret()" class="input-dark px-6 py-4 rounded-xl text-base font-mono font-bold text-emerald-400 bg-black/40 cursor-pointer hover:bg-black/60 transition group relative overflow-hidden flex items-center justify-between">
                            <span id="detailAppSecretDisplay" class="blur-sm group-hover:blur-none transition-all duration-300">••••••••••••••••••••••••••••••••</span>
                            <span class="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-3 py-1.5 rounded-lg text-xs text-white">Copy</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center mb-5">
                    <div class="text-sm font-bold text-gray-300 flex items-center gap-3 tracking-widest uppercase"><span class="text-blue-500 text-2xl drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">&lt;/&gt;</span> SDK Snippet</div>
                </div>
                <div class="glass-panel p-8 bg-[#03050a]/80 relative border-[#1e2433]">
                    <button onclick="copySnippet()" class="absolute top-5 right-5 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition uppercase tracking-wider">Copy</button>
                    <pre class="text-sm font-mono leading-relaxed overflow-x-auto font-bold pt-2 pb-2"><span class="text-blue-400">Cshellauth</span> <span class="text-yellow-300">App</span>(
    <span class="text-emerald-400" id="snipId">"16aeaa362a18"</span>,
    <span class="text-emerald-400" id="snipName">"cshellvn"</span>,
    <span class="text-emerald-400" id="snipVersion">"1.0.0"</span>,
    <span class="text-emerald-400" id="snipSecret">"ObtGhXDufiGfQAgGW9Cp4T2tkjzGgm4Ujv0x1hFS"</span>
);</pre>
                </div>
            </div>
            <div id="noAppsPanel" class="flex-1 flex flex-col items-center justify-center pt-20">
                <div class="text-blue-500 mb-6 text-7xl drop-shadow-[0_0_50px_rgba(37,99,235,0.4)]">📦</div>
                <div class="text-3xl font-extrabold text-white mb-3 tracking-tight">No Apps Found</div>
                <div class="text-base text-gray-400 font-medium">Create a new application to get started.</div>
            </div>
        </div>
    </div>
    
    <!-- Modals -->
    <div id="newAppModal" class="fixed inset-0 bg-[#03050a]/90 backdrop-blur-xl flex items-center justify-center z-[100] animate-[fadeIn_0.2s_ease-out]" style="display: none;">
        <div class="glass-panel p-10 w-full max-w-md shadow-[0_0_80px_rgba(37,99,235,0.2)] border-blue-500/30 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div class="flex justify-between items-center mb-10 relative z-10">
                <h3 class="text-2xl font-extrabold text-white tracking-tight">Create App</h3>
                <button onclick="closeAppModal()" class="text-gray-500 hover:text-white text-2xl transition">✕</button>
            </div>
            <div class="space-y-6 relative z-10">
                <div>
                    <label class="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest mb-3">App Name</label>
                    <input type="text" id="modalAppName" placeholder="e.g. MyCheat" class="w-full input-dark px-6 py-4 rounded-xl font-bold text-lg">
                </div>
                <div>
                    <label class="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Version</label>
                    <input type="text" id="modalAppVersion" value="1.0.0" class="w-full input-dark px-6 py-4 rounded-xl font-bold text-lg opacity-60 cursor-not-allowed" readonly>
                </div>
                <button onclick="submitCreateApp(event)" class="w-full btn-primary font-bold py-4 rounded-xl mt-8 tracking-wider uppercase text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all">Create Application</button>
            </div>
        </div>
    </div>

    <script>
        let appsData = [];
        let currentApp = null;

        document.addEventListener('DOMContentLoaded', loadApps);

        async function loadApps() {
            const adminPass = sessionStorage.getItem('adminPass');
            if(!adminPass) return;
            try {
                const res = await fetch('/api/admin/apps/list', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({adminPassword: adminPass})
                });
                const data = await res.json();
                if(data.success) {
                    appsData = data.apps;
                    if(appsData.length === 0) {
                        // Tự động tạo 1 app mặc định cshellvn
                        await fetch('/api/admin/apps/create', {
                            method: 'POST', headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({adminPassword: adminPass, name: 'cshellvn', version: '1.0.0'})
                        });
                        return loadApps(); // Reload
                    }
                    renderAppsList();
                    if(appsData.length > 0) selectApp(appsData[0]._id);
                }
            } catch(e) {}
        }

        function renderAppsList(filter = '') {
            const list = document.getElementById('appsList');
            list.innerHTML = '';
            
            const filtered = appsData.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()));
            
            if(filtered.length === 0) {
                list.innerHTML = '<div class="text-gray-500 text-sm py-4 text-center font-medium mt-10">No matching apps...</div>';
                return;
            }

            filtered.forEach(app => {
                const isActive = currentApp && currentApp._id === app._id;
                const activeClasses = isActive 
                    ? 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_30px_rgba(37,99,235,0.15)]' 
                    : 'border-white/5 hover:border-white/20';
                
                const activeIndicator = isActive 
                    ? '<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 shadow-[0_0_15px_#3b82f6]"></div>'
                    : '';

                list.innerHTML += \`<div onclick="selectApp('\${app._id}')" class="glass-panel p-6 cursor-pointer relative overflow-hidden transition hover:scale-[1.02] \${activeClasses}">\${activeIndicator}<div class="text-xl font-extrabold text-white mb-1 tracking-tight">\${app.name}</div><div class="text-sm \${isActive ? 'text-blue-300' : 'text-gray-500'} font-mono font-bold">v\${app.version}</div><div class="absolute right-6 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full \${isActive ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' : 'bg-[#1e2433] border border-white/10'}"></div></div>\`;
            });
        }

        function filterApps() {
            const val = document.getElementById('appSearchInput').value;
            renderAppsList(val);
        }

        function selectApp(id) {
            currentApp = appsData.find(a => a._id === id);
            renderAppsList(document.getElementById('appSearchInput').value);
            
            if(!currentApp) {
                document.getElementById('noAppsPanel').style.display = 'flex';
                document.getElementById('appDetailsPanel').style.display = 'none';
                return;
            }

            document.getElementById('noAppsPanel').style.display = 'none';
            document.getElementById('appDetailsPanel').style.display = 'block';
            
            document.getElementById('detailAppName').innerText = currentApp.name;
            document.getElementById('detailAppLabelName').innerText = currentApp.name;
            document.getElementById('detailAppVersion').innerText = currentApp.version;
            document.getElementById('detailAppSecretDisplay').innerText = currentApp.secret;

            // SDK Snippet updates
            document.getElementById('snipId').innerText = \`"\${currentApp._id}"\`;
            document.getElementById('snipName').innerText = \`"\${currentApp.name}"\`;
            document.getElementById('snipVersion').innerText = \`"\${currentApp.version}"\`;
            document.getElementById('snipSecret').innerText = \`"\${currentApp.secret}"\`;
        }

        function openNewAppModal() { document.getElementById('newAppModal').style.display = 'flex'; }
        function closeAppModal() { document.getElementById('newAppModal').style.display = 'none'; }

        async function submitCreateApp(event) {
            const adminPass = sessionStorage.getItem('adminPass');
            const nameInput = document.getElementById('modalAppName');
            const name = nameInput.value.trim();
            const version = document.getElementById('modalAppVersion').value;
            
            if(!name) return alert("Vui lòng nhập tên App!");
            
            const btn = event.target;
            const originalText = btn.innerText;
            btn.innerText = "Creating...";
            btn.disabled = true;

            try {
                const res = await fetch('/api/admin/apps/create', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({adminPassword: adminPass, name, version})
                });
                const data = await res.json();
                if(data.success) {
                    nameInput.value = '';
                    closeAppModal();
                    await loadApps();
                    if(data.app) selectApp(data.app._id);
                } else {
                    alert("Lỗi: " + (data.message || "Không thể tạo App. Kiểm tra mật khẩu admin!"));
                }
            } catch(e) { 
                console.error(e);
                alert("Lỗi kết nối server!"); 
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        }

        async function deleteCurrentApp() {
            if(!currentApp) return;
            if(!confirm(\`Are you sure you want to delete app "\${currentApp.name}"?\`)) return;
            const adminPass = sessionStorage.getItem('adminPass');
            try {
                const res = await fetch('/api/admin/apps/delete', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({adminPassword: adminPass, appId: currentApp._id})
                });
                const data = await res.json();
                if(data.success) {
                    currentApp = null;
                    await loadApps();
                } else alert("Error deleting app!");
            } catch(e) { alert("Connection error!"); }
        }

        function copySecret() {
            if(!currentApp) return;
            navigator.clipboard.writeText(currentApp.secret);
            alert("✅ Integration Secret copied to clipboard!");
        }

        function copySnippet() {
            if(!currentApp) return;
            const text = \`Cshellauth App(\\n    "\${currentApp._id}",\\n    "\${currentApp.name}",\\n    "\${currentApp.version}",\\n    "\${currentApp.secret}"\\n);\`;
            navigator.clipboard.writeText(text);
            alert("✅ SDK Snippet copied to clipboard!");
        }
    </script>
`;

const usersContent = `
    <div class="max-w-7xl mx-auto h-full flex flex-col animate-[fadeIn_0.4s_ease-out]">
        <div class="flex justify-between items-end mb-10 shrink-0">
            <div>
                <h1 class="text-4xl font-extrabold text-white mb-2 tracking-tight">Users</h1>
                <p class="text-sm text-gray-400 font-medium">Manage user accounts and subscriptions.</p>
            </div>
            <button onclick="openNewUserModal()" class="btn-primary px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 transition hover:-translate-y-1">+ New User</button>
        </div>
        
        <div class="glass-panel overflow-hidden flex-1 flex flex-col" id="usersDataPanel" style="display: none;">
            <div class="p-6 border-b border-white/5 flex justify-between items-center bg-black/20 shrink-0">
                <input type="text" id="userSearchInput" placeholder="Search users..." class="input-dark px-6 py-3 text-sm rounded-xl w-80 font-bold tracking-wide" onkeyup="filterUsers()">
            </div>
            <div class="overflow-y-auto flex-1">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="table-header bg-black/40">
                            <th class="px-8 py-6">Username</th>
                            <th class="px-6 py-6">Password</th>
                            <th class="px-6 py-6">Duration</th>
                            <th class="px-6 py-6 text-center">Devices</th>
                            <th class="px-6 py-6">App</th>
                            <th class="px-6 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="userTableBody">
                        <!-- Dynamic rows -->
                    </tbody>
                </table>
            </div>
        </div>

        <div id="noUsersPanel" class="glass-panel flex-1 flex flex-col items-center justify-center">
            <div class="text-blue-500 mb-8 text-7xl drop-shadow-[0_0_50px_rgba(37,99,235,0.4)]">👥</div>
            <div class="text-3xl font-extrabold text-white mb-3 tracking-tight">No users found</div>
            <div class="text-base text-gray-400 font-medium">Your user database is currently empty.</div>
        </div>
    </div>

    <!-- Modal -->
    <div id="newUserModal" class="fixed inset-0 bg-[#03050a]/90 backdrop-blur-xl flex items-center justify-center z-[100] animate-[fadeIn_0.2s_ease-out]" style="display: none;">
        <div class="glass-panel p-10 w-full max-w-md shadow-[0_0_80px_rgba(37,99,235,0.2)] border-blue-500/30 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div class="flex justify-between items-center mb-10 relative z-10">
                <h3 class="text-2xl font-extrabold text-white tracking-tight">Create User</h3>
                <button onclick="closeUserModal()" class="text-gray-500 hover:text-white text-2xl transition">✕</button>
            </div>
            <div class="space-y-6 relative z-10">
                <div>
                    <label class="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Username</label>
                    <input type="text" id="modalUserUsername" class="w-full input-dark px-6 py-4 rounded-xl font-bold text-lg" required>
                </div>
                <div>
                    <label class="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Password</label>
                    <input type="text" id="modalUserPassword" class="w-full input-dark px-6 py-4 rounded-xl font-bold text-lg" required>
                </div>
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <label class="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Days</label>
                        <input type="number" id="modalUserDays" value="30" class="w-full input-dark px-6 py-4 rounded-xl font-bold text-lg">
                    </div>
                    <div>
                        <label class="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Max Devices</label>
                        <input type="number" id="modalUserDevices" value="1" class="w-full input-dark px-6 py-4 rounded-xl font-bold text-lg">
                    </div>
                </div>
                <div>
                    <label class="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Target App</label>
                    <select id="modalUserApp" class="w-full input-dark px-6 py-4 rounded-xl font-bold text-base cursor-pointer">
                        <option value="">Loading apps...</option>
                    </select>
                </div>
                <button onclick="submitCreateUser()" class="w-full btn-primary font-bold py-4 rounded-xl mt-8 tracking-wider uppercase text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all">Create User</button>
            </div>
        </div>
    </div>

    <script>
        let usersData = [];
        let availableApps = [];

        document.addEventListener('DOMContentLoaded', async () => {
            await loadUsers();
            await loadAppsForDropdown();
        });

        async function loadUsers() {
            const adminPass = sessionStorage.getItem('adminPass');
            if(!adminPass) return;
            try {
                const res = await fetch('/api/admin/users/list', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({adminPassword: adminPass})
                });
                const data = await res.json();
                if(data.success) {
                    usersData = data.users;
                    if(usersData.length === 0) {
                        document.getElementById('noUsersPanel').style.display = 'flex';
                        document.getElementById('usersDataPanel').style.display = 'none';
                    } else {
                        document.getElementById('noUsersPanel').style.display = 'none';
                        document.getElementById('usersDataPanel').style.display = 'flex';
                        renderUsersList();
                    }
                }
            } catch(e) {}
        }

        async function loadAppsForDropdown() {
            const adminPass = sessionStorage.getItem('adminPass');
            try {
                const res = await fetch('/api/admin/apps/list', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({adminPassword: adminPass})
                });
                const data = await res.json();
                if(data.success) {
                    availableApps = data.apps;
                    const select = document.getElementById('modalUserApp');
                    select.innerHTML = '';
                    if(availableApps.length === 0) {
                        select.innerHTML = '<option value="">No apps created yet!</option>';
                    } else {
                        availableApps.forEach(app => {
                            select.innerHTML += \`<option value="\${app._id}">\${app.name} (v\${app.version})</option>\`;
                        });
                    }
                }
            } catch(e) {}
        }

        function renderUsersList(filter = '') {
            const tbody = document.getElementById('userTableBody');
            tbody.innerHTML = '';
            
            const filtered = usersData.filter(u => u.username.toLowerCase().includes(filter.toLowerCase()));
            
            filtered.forEach(user => {
                const devicesCount = user.hwids ? user.hwids.length : 0;
                const appName = user.appId ? user.appId.name : 'Unknown App';
                
                let expiryText = \`<div class="text-white font-bold text-sm">\${user.days} Days</div><div class="text-[0.6rem] text-emerald-400 font-bold mt-0.5 tracking-widest uppercase">UNUSED</div>\`;
                if(user.isUsed) {
                    const expired = new Date() > new Date(user.expiryDate);
                    if(expired) {
                        expiryText = \`<div class="text-red-400 font-bold text-sm">Expired</div><div class="text-[0.6rem] text-red-500/50 font-bold mt-0.5 tracking-widest uppercase">LOCKED</div>\`;
                    } else {
                        expiryText = \`<div class="text-white font-bold text-sm">\${user.days} Days</div><div class="text-[0.6rem] text-blue-400 font-bold mt-0.5 tracking-widest uppercase">ACTIVE</div>\`;
                    }
                }

                tbody.innerHTML += \`
                    <tr class="table-row">
                        <td class="px-8 py-6">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                                <span class="font-mono text-white font-bold text-base tracking-tight">\${user.username}</span>
                            </div>
                        </td>
                        <td class="px-6 py-6 font-mono text-gray-500 font-medium text-xs tracking-widest">\${user.password}</td>
                        <td class="px-6 py-6">\${expiryText}</td>
                        <td class="px-6 py-6 text-center">
                            <div class="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                                <span class="text-white font-black text-sm">\${devicesCount}</span>
                                <span class="text-gray-500 text-[0.6rem] font-bold uppercase tracking-tighter">/ \${user.maxDevices}</span>
                            </div>
                        </td>
                        <td class="px-6 py-6"><span class="badge-active bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] font-bold uppercase tracking-widest text-[0.6rem]">\${appName}</span></td>
                        <td class="px-6 py-6 text-right whitespace-nowrap">
                            <button onclick="resetUserHwid('\${user._id}')" class="text-[0.65rem] bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 px-4 py-2 rounded-xl border border-purple-500/20 font-bold uppercase tracking-widest transition mr-2" title="Reset HWID">Reset HWID</button>
                            <button onclick="deleteUser('\${user._id}', '\${user.username}')" class="text-[0.65rem] bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-2 rounded-xl border border-red-500/20 font-bold uppercase tracking-widest transition" title="Delete User">✕</button>
                        </td>
                    </tr>
                \`;
            });
        }

        function filterUsers() {
            renderUsersList(document.getElementById('userSearchInput').value);
        }

        function openNewUserModal() { document.getElementById('newUserModal').style.display = 'flex'; }
        function closeUserModal() { document.getElementById('newUserModal').style.display = 'none'; }

        async function submitCreateUser() {
            const adminPass = sessionStorage.getItem('adminPass');
            const username = document.getElementById('modalUserUsername').value;
            const password = document.getElementById('modalUserPassword').value;
            const days = document.getElementById('modalUserDays').value;
            const maxDevices = document.getElementById('modalUserDevices').value;
            const appId = document.getElementById('modalUserApp').value;
            
            if(!username || !password) return alert("Please fill Username and Password!");
            if(!appId) return alert("Please select a target App!");

            try {
                const res = await fetch('/api/admin/users/create', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ adminPassword: adminPass, username, password, days: parseInt(days), maxDevices: parseInt(maxDevices), appId })
                });
                const data = await res.json();
                if(data.success) {
                    closeUserModal();
                    await loadUsers();
                    document.getElementById('modalUserUsername').value = '';
                    document.getElementById('modalUserPassword').value = '';
                } else alert("Error: " + data.message);
            } catch(e) { alert("Connection error!"); }
        }

        async function deleteUser(id, name) {
            if(!confirm(\`Delete user "\${name}"?\`)) return;
            const adminPass = sessionStorage.getItem('adminPass');
            try {
                const res = await fetch('/api/admin/users/delete', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({adminPassword: adminPass, userId: id})
                });
                const data = await res.json();
                if(data.success) await loadUsers();
            } catch(e) {}
        }

        async function resetUserHwid(id) {
            if(!confirm("Reset HWID for this user? This allows them to login from a new device.")) return;
            const adminPass = sessionStorage.getItem('adminPass');
            try {
                const res = await fetch('/api/admin/users/reset-hwid', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({adminPassword: adminPass, userId: id})
                });
                const data = await res.json();
                if(data.success) {
                    alert("✅ HWID Reset Successful!");
                    await loadUsers();
                }
            } catch(e) {}
        }
    </script>
`;

const licensesContent = `
    <div class="max-w-7xl mx-auto h-full flex flex-col animate-[fadeIn_0.4s_ease-out]">
        <div class="flex justify-between items-end mb-10 shrink-0">
            <div>
                <h1 class="text-4xl font-extrabold text-white mb-2 tracking-tight">Licenses</h1>
                <p class="text-sm text-gray-400 font-medium">Manage software license keys.</p>
            </div>
            <button onclick="openNewLicenseModal()" class="btn-primary px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-purple-500/30 transition hover:-translate-y-1" style="background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);">+ Generate Key</button>
        </div>
        
        <div class="glass-panel overflow-hidden flex-1 flex flex-col" id="licensesDataPanel" style="display: none;">
            <div class="p-6 border-b border-white/5 flex justify-between items-center bg-black/20 shrink-0">
                <input type="text" id="licenseSearchInput" placeholder="Search keys or HWID..." class="input-dark px-6 py-3 text-sm rounded-xl w-80 font-bold tracking-wide" onkeyup="filterLicenses()">
            </div>
            <div class="overflow-y-auto flex-1">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="table-header bg-black/40">
                            <th class="px-8 py-6">License Key</th>
                            <th class="px-6 py-6">Status / Info</th>
                            <th class="px-6 py-6">Duration</th>
                            <th class="px-6 py-6 text-center">Devices</th>
                            <th class="px-6 py-6">Target App</th>
                            <th class="px-6 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="licenseTableBody">
                        <!-- Dynamic rows -->
                    </tbody>
                </table>
            </div>
        </div>

        <div id="noLicensesPanel" class="glass-panel flex-1 flex flex-col items-center justify-center">
            <div class="text-purple-500 mb-8 text-7xl drop-shadow-[0_0_50px_rgba(168,85,247,0.4)]">🔑</div>
            <div class="text-3xl font-extrabold text-white mb-3 tracking-tight">No licenses found</div>
            <div class="text-base text-gray-400 font-medium">Generate a new license key to get started.</div>
        </div>
    </div>

    <!-- Modal -->
    <div id="newLicenseModal" class="fixed inset-0 bg-[#03050a]/90 backdrop-blur-xl flex items-center justify-center z-[100] animate-[fadeIn_0.2s_ease-out]" style="display: none;">
        <div class="glass-panel p-10 w-full max-w-md shadow-[0_0_80px_rgba(168,85,247,0.2)] border-purple-500/30 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div class="flex justify-between items-center mb-10 relative z-10">
                <h3 class="text-2xl font-extrabold text-white tracking-tight">Generate Key</h3>
                <button onclick="closeLicenseModal()" class="text-gray-500 hover:text-white text-2xl transition">✕</button>
            </div>
            <div class="space-y-6 relative z-10">
                <div>
                    <label class="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Custom Key (Optional)</label>
                    <input type="text" id="modalLicenseKey" placeholder="Leave empty for random key" class="w-full input-dark px-6 py-4 rounded-xl font-bold text-lg font-mono text-purple-400 placeholder:text-gray-600">
                </div>
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <label class="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Days</label>
                        <input type="number" id="modalLicenseDays" value="30" class="w-full input-dark px-6 py-4 rounded-xl font-bold text-lg">
                    </div>
                    <div>
                        <label class="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Max Devices</label>
                        <input type="number" id="modalLicenseDevices" value="1" class="w-full input-dark px-6 py-4 rounded-xl font-bold text-lg">
                    </div>
                </div>
                <div>
                    <label class="block text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest mb-3">Target App</label>
                    <select id="modalLicenseApp" class="w-full input-dark px-6 py-4 rounded-xl font-bold text-base cursor-pointer">
                        <option value="">Loading apps...</option>
                    </select>
                </div>
                <button onclick="submitCreateLicense()" class="w-full btn-primary font-bold py-4 rounded-xl mt-8 tracking-wider uppercase text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:-translate-y-1 transition-all" style="background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);">Generate Key</button>
            </div>
        </div>
    </div>

    <script>
        let licensesData = [];
        let availableAppsForLicense = [];

        document.addEventListener('DOMContentLoaded', async () => {
            await loadLicenses();
            await loadAppsForLicenseDropdown();
        });

        async function loadLicenses() {
            const adminPass = sessionStorage.getItem('adminPass');
            if(!adminPass) return;
            try {
                const res = await fetch('/api/admin/licenses/list', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({adminPassword: adminPass})
                });
                const data = await res.json();
                if(data.success) {
                    licensesData = data.licenses;
                    if(licensesData.length === 0) {
                        document.getElementById('noLicensesPanel').style.display = 'flex';
                        document.getElementById('licensesDataPanel').style.display = 'none';
                    } else {
                        document.getElementById('noLicensesPanel').style.display = 'none';
                        document.getElementById('licensesDataPanel').style.display = 'flex';
                        renderLicensesList();
                    }
                }
            } catch(e) {}
        }

        async function loadAppsForLicenseDropdown() {
            const adminPass = sessionStorage.getItem('adminPass');
            try {
                const res = await fetch('/api/admin/apps/list', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({adminPassword: adminPass})
                });
                const data = await res.json();
                if(data.success) {
                    availableAppsForLicense = data.apps;
                    const select = document.getElementById('modalLicenseApp');
                    select.innerHTML = '';
                    if(availableAppsForLicense.length === 0) {
                        select.innerHTML = '<option value="">No apps found!</option>';
                    } else {
                        availableAppsForLicense.forEach(app => {
                            select.innerHTML += \`<option value="\${app._id}">\${app.name}</option>\`;
                        });
                    }
                }
            } catch(e) {}
        }

        function renderLicensesList(filter = '') {
            const tbody = document.getElementById('licenseTableBody');
            tbody.innerHTML = '';
            
            const filtered = licensesData.filter(l => 
                l.key.toLowerCase().includes(filter.toLowerCase()) || 
                (l.hwids && l.hwids.some(h => h.toLowerCase().includes(filter.toLowerCase())))
            );
            
            filtered.forEach(lic => {
                const appName = lic.appId ? lic.appId.name : 'Unknown App';
                const devicesCount = lic.hwids ? lic.hwids.length : 0;
                
                let statusInfo = '<span class="text-gray-500 italic text-[0.6rem] font-bold tracking-widest uppercase">Unbound</span>';
                if(lic.hwids && lic.hwids.length > 0) {
                    statusInfo = \`<div class="text-emerald-400 font-mono text-[0.65rem] font-bold tracking-tight shadow-[0_0_10px_rgba(16,185,129,0.1)]">\${lic.hwids[0].substring(0,12)}...</div>\`;
                }

                let expiryText = \`<div class="text-white font-bold text-sm">\${lic.days} Days</div><div class="text-[0.6rem] text-emerald-400 font-bold mt-0.5 tracking-widest uppercase">UNUSED</div>\`;
                if(lic.isUsed || lic.expiryDate) {
                    const expired = new Date() > new Date(lic.expiryDate);
                    if(expired) {
                        expiryText = \`<div class="text-red-400 font-bold text-sm">Expired</div><div class="text-[0.6rem] text-red-500/50 font-bold mt-0.5 tracking-widest uppercase">LOCKED</div>\`;
                    } else {
                        expiryText = \`<div class="text-white font-bold text-sm">\${lic.days} Days</div><div class="text-[0.6rem] text-blue-400 font-bold mt-0.5 tracking-widest uppercase">ACTIVE</div>\`;
                    }
                }

                tbody.innerHTML += \`
                    <tr class="table-row">
                        <td class="px-8 py-6">
                            <div class="font-mono text-purple-400 font-bold text-xs tracking-[0.2em] bg-purple-500/5 inline-block px-3 py-2 rounded-lg border border-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.05)] uppercase">\${lic.key}</div>
                        </td>
                        <td class="px-6 py-6">\${statusInfo}</td>
                        <td class="px-6 py-6">\${expiryText}</td>
                        <td class="px-6 py-6 text-center">
                            <div class="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                                <span class="text-white font-black text-sm">\${devicesCount}</span>
                                <span class="text-gray-500 text-[0.6rem] font-bold uppercase tracking-tighter">/ \${lic.maxDevices || 1}</span>
                            </div>
                        </td>
                        <td class="px-6 py-6"><span class="badge-active bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] font-bold uppercase tracking-widest text-[0.6rem]">\${appName}</span></td>
                        <td class="px-6 py-6 text-right whitespace-nowrap">
                            <button onclick="copyLicense('\${lic.key}')" class="text-[0.6rem] bg-gray-500/10 text-gray-400 hover:text-white hover:bg-gray-500/30 px-3 py-2 rounded-xl font-bold uppercase tracking-widest transition mr-2 border border-white/5" title="Copy Key">Copy</button>
                            <button onclick="resetLicenseHwid('\${lic.key}')" class="text-[0.6rem] bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 px-3 py-2 rounded-xl border border-purple-500/20 font-bold uppercase tracking-widest transition mr-2" title="Reset HWID">Reset</button>
                            <button onclick="deleteLicense('\${lic._id}', '\${lic.key}')" class="text-[0.6rem] bg-red-500/10 text-red-400 hover:bg-red-500/20 px-2.5 py-2 rounded-xl border border-red-500/20 font-bold uppercase tracking-widest transition" title="Delete Key">✕</button>
                        </td>
                    </tr>
                \`;
            });
        }

        function filterLicenses() {
            renderLicensesList(document.getElementById('licenseSearchInput').value);
        }

        function openNewLicenseModal() { document.getElementById('newLicenseModal').style.display = 'flex'; }
        function closeLicenseModal() { document.getElementById('newLicenseModal').style.display = 'none'; }

        async function submitCreateLicense() {
            const adminPass = sessionStorage.getItem('adminPass');
            const customKey = document.getElementById('modalLicenseKey').value;
            const days = document.getElementById('modalLicenseDays').value;
            const maxDevices = document.getElementById('modalLicenseDevices').value;
            const appId = document.getElementById('modalLicenseApp').value;
            
            if(!appId) return alert("Please select a target App!");

            try {
                const res = await fetch('/api/admin/create-key', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ adminPassword: adminPass, customKey, days: parseInt(days), maxDevices: parseInt(maxDevices), appId })
                });
                const data = await res.json();
                if(data.success) {
                    closeLicenseModal();
                    await loadLicenses();
                    document.getElementById('modalLicenseKey').value = '';
                    alert("✅ Key created: " + data.key);
                } else alert("Error: " + data.message);
            } catch(e) { alert("Connection error!"); }
        }

        async function deleteLicense(id, keyStr) {
            if(!confirm(\`Delete license key "\${keyStr}"?\`)) return;
            const adminPass = sessionStorage.getItem('adminPass');
            try {
                const res = await fetch('/api/admin/licenses/delete', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({adminPassword: adminPass, licenseId: id})
                });
                const data = await res.json();
                if(data.success) await loadLicenses();
            } catch(e) {}
        }

        async function resetLicenseHwid(key) {
            if(!confirm("Reset HWID for this license?")) return;
            const adminPass = sessionStorage.getItem('adminPass');
            try {
                const res = await fetch('/api/admin/reset-hwid', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({adminPassword: adminPass, key: key})
                });
                const data = await res.json();
                if(data.success) {
                    alert("✅ HWID Reset Successful!");
                    await loadLicenses();
                }
            } catch(e) {}
        }
        
        function copyLicense(key) {
            navigator.clipboard.writeText(key);
            alert("✅ Key copied to clipboard!");
        }
    </script>
`;

const sessionContent = `
    <div class="max-w-7xl mx-auto h-full flex flex-col animate-[fadeIn_0.4s_ease-out]">
        <div class="flex justify-between items-end mb-10 shrink-0">
            <div>
                <h1 class="text-4xl font-extrabold text-white mb-2 tracking-tight">Sessions</h1>
                <p class="text-sm text-gray-400 font-medium">Monitor real-time authentication activity.</p>
            </div>
            <button onclick="loadSessions()" class="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-bold transition shadow-md tracking-wider uppercase border border-white/5 flex items-center gap-2">
                <span class="text-lg">↻</span> Refresh
            </button>
        </div>
        <div class="glass-panel overflow-hidden flex-1 flex flex-col" id="sessionsDataPanel" style="display: none;">
            <div class="overflow-y-auto flex-1">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="table-header bg-black/40">
                            <th class="px-8 py-6">Identity (Key/User)</th>
                            <th class="px-6 py-6">App Target</th>
                            <th class="px-6 py-6">IP Address</th>
                            <th class="px-6 py-6">Timestamp</th>
                            <th class="px-6 py-6 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody id="sessionTableBody">
                        <!-- Dynamic logs -->
                    </tbody>
                </table>
            </div>
        </div>

        <div id="noSessionsPanel" class="glass-panel flex-1 flex flex-col items-center justify-center">
            <div class="text-blue-400 mb-8 text-7xl drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]">📡</div>
            <div class="text-3xl font-extrabold text-white mb-3 tracking-tight">No active sessions</div>
            <div class="text-base text-gray-400 font-medium">Waiting for the first authentication event...</div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', loadSessions);

        async function loadSessions() {
            const adminPass = sessionStorage.getItem('adminPass');
            if(!adminPass) return;
            try {
                const res = await fetch('/api/admin/sessions/list', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({adminPassword: adminPass})
                });
                const data = await res.json();
                if(data.success) {
                    const logs = data.logs;
                    if(logs.length === 0) {
                        document.getElementById('noSessionsPanel').style.display = 'flex';
                        document.getElementById('sessionsDataPanel').style.display = 'none';
                    } else {
                        document.getElementById('noSessionsPanel').style.display = 'none';
                        document.getElementById('sessionsDataPanel').style.display = 'flex';
                        renderSessions(logs);
                    }
                }
            } catch(e) {}
        }

        function renderSessions(logs) {
            const tbody = document.getElementById('sessionTableBody');
            tbody.innerHTML = '';
            
            logs.forEach(log => {
                const date = new Date(log.timestamp);
                const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const dateStr = date.toLocaleDateString();
                
                const identity = log.key || log.username || 'System';
                
                tbody.innerHTML += \`
                    <tr class="table-row">
                        <td class="px-8 py-6 font-mono text-blue-400 font-bold text-sm tracking-wide">\${identity}</td>
                        <td class="px-6 py-6"><span class="badge-active bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-none font-bold uppercase tracking-widest text-[0.6rem]">\${log.app}</span></td>
                        <td class="px-6 py-6 font-mono text-gray-500 font-bold text-xs tracking-wider">\${log.ip || 'Unknown'}</td>
                        <td class="px-6 py-6">
                            <div class="text-white font-bold text-xs">\${timeStr}</div>
                            <div class="text-[0.6rem] text-gray-500 font-bold mt-1 tracking-widest uppercase">\${dateStr}</div>
                        </td>
                        <td class="px-6 py-6 text-center">
                            <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[0.6rem] font-black uppercase tracking-widest">SUCCESS</span>
                        </td>
                    </tr>
                \`;
            });
        }
    </script>
`;

fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), head('Login') + loginContent + `</body></html>`);
fs.writeFileSync(path.join(__dirname, 'public', 'dashboard.html'), head('Dashboard') + sidebar('dashboard') + dashboardContent + foot);
fs.writeFileSync(path.join(__dirname, 'public', 'apps.html'), head('Apps') + sidebar('apps') + appsContent + foot);
fs.writeFileSync(path.join(__dirname, 'public', 'users.html'), head('Users') + sidebar('users') + usersContent + foot);
fs.writeFileSync(path.join(__dirname, 'public', 'licenses.html'), head('Licenses') + sidebar('licenses') + licensesContent + foot);
fs.writeFileSync(path.join(__dirname, 'public', 'session.html'), head('Sessions') + sidebar('session') + sessionContent + foot);
console.log('Done generating all files!');
