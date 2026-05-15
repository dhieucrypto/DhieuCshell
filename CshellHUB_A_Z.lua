-- [[ CSHELL HUB - REBOOT LOADER ]] --
local _0xDecode = function(t) local s = "" for _, v in ipairs(t) do s = s .. string.char(v) end return s end

local _0xCID = {54,57,101,99,99,57,57,101,52,51,48,51,99,50,57,53,51,50,49,100,51,53,51,49}
local _0xCSC = {52,54,57,55,102,55,50,97,56,54,102,98,102,55,53,53,54,51,101,102,56,99,50,98,53,55,53,53,102,48,99,51,97,98,102,102,99,50,49,102}
local _0xURL = {104,116,116,112,115,58,47,47,99,115,104,101,108,108,118,110,46,118,101,114,99,101,108,46,97,112,112,47,97,112,105,47,99,108,105,101,110,116,47,118,101,114,105,102,121}
local _0xLNK = {104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,100,104,105,101,117,99,114,121,112,116,111,47,68,104,105,101,117,67,115,104,101,108,108,47,109,97,105,110,47,67,115,104,101,108,108,72,85,66,95,70,105,110,97,108,46,108,117,97}

local AppID, Secret, ApiURL, MainLnk = _0xDecode(_0xCID), _0xDecode(_0xCSC), _0xDecode(_0xURL), _0xDecode(_0xLNK)

print("Cshell HUB: Initializing...")

local req = (syn and syn.request) or (http and http.request) or http_request or (fluxus and fluxus.request) or request
if not req then return warn("Executor not supported!") end

local function Login(key)
    print("Cshell HUB: Verifying Key...")
    local res = req({
        Url = ApiURL,
        Method = "POST",
        Headers = {["Content-Type"]="application/json"},
        Body = game:GetService("HttpService"):JSONEncode({appId = AppID, secret = Secret, key = key, hwid = game:GetService("RbxAnalyticsService"):GetClientId()})
    })
    
    local data = game:GetService("HttpService"):JSONDecode(res.Body)
    if data.success then
        print("Cshell HUB: Success! Loading Script...")
        loadstring(game:HttpGet(MainLnk))()
    else
        print("Cshell HUB: Error - " .. (data.message or "Invalid Key"))
    end
end

-- Tự động lấy Key nếu đã lưu
if isfile("CshellHUB_Key.txt") then
    Login(readfile("CshellHUB_Key.txt"))
else
    -- Nếu chưa có key, hiện bảng login đơn giản
    warn("Please save your key in CshellHUB_Key.txt to auto-login!")
    -- Ở đây mình tạm thời trỏ thẳng vào load script để bro test nhanh
    loadstring(game:HttpGet(MainLnk))()
end
