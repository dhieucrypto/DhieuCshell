-- [[ CSHELL HUB - PREMIUM FINAL SECURE V3 ]] --
local _0xDecode = function(t) local s = "" for _, v in ipairs(t) do s = s .. string.char(v) end return s end

-- [[ ENCRYPTED CONFIGURATION ]] --
local _0xCID = {54,57,101,99,99,57,57,101,52,51,48,51,99,50,57,53,51,50,49,100,51,53,51,49} -- AppID
local _0xCSC = {52,54,57,55,102,55,50,97,56,54,102,98,102,55,53,53,54,51,101,102,56,99,50,98,53,55,53,53,102,48,99,51,97,98,102,102,99,50,49,102} -- Secret
local _0xURL = {104,116,116,112,115,58,47,47,99,115,104,101,108,108,118,110,46,118,101,114,99,101,108,46,97,112,112,47,97,112,105,47,99,108,105,101,110,116,47,118,101,114,105,102,121} -- ApiURL
local _0xLNK = {104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,100,104,105,101,117,99,114,121,112,116,111,47,68,104,105,101,117,67,115,104,101,108,108,47,109,97,105,110,47,67,115,104,101,108,108,72,85,66,95,68,97,116,97,46,108,117,97} -- Main Script Link
local _0xGK = {104,116,116,112,115,58,47,47,99,115,104,101,108,108,118,110,46,118,101,114,99,101,108,46,97,112,112,47,103,101,116,107,101,121} -- https://cshellvn.vercel.app/getkey

local Config = {
    AppID = _0xDecode(_0xCID),
    Secret = _0xDecode(_0xCSC),
    ApiURL = _0xDecode(_0xURL),
    MainLnk = _0xDecode(_0xLNK),
    GetKey = _0xDecode(_0xGK),
    SaveFile = "CshellHUB_Key.txt"
}

local HttpService = game:GetService("HttpService")
local StarterGui = game:GetService("StarterGui")
local UserInputService = game:GetService("UserInputService")
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

-- [[ UI SYSTEM - UPGRADED SIZE ]] --
local CshellLogin = Instance.new("ScreenGui")
local MainLogin = Instance.new("Frame")
local Title = Instance.new("TextLabel")
local KeyInput = Instance.new("TextBox")
local LoginBtn = Instance.new("TextButton")
local GetKeyBtn = Instance.new("TextButton")
local Status = Instance.new("TextLabel")

CshellLogin.Name = "CshellLogin"; CshellLogin.Parent = LocalPlayer:WaitForChild("PlayerGui"); CshellLogin.ResetOnSpawn = false
MainLogin.Name = "MainLogin"; MainLogin.Parent = CshellLogin; MainLogin.BackgroundColor3 = Color3.fromRGB(15, 15, 20); MainLogin.Position = UDim2.new(0.5, -175, 0.5, -125); MainLogin.Size = UDim2.new(0, 350, 0, 250)
Instance.new("UICorner", MainLogin).CornerRadius = UDim.new(0, 15)
local Stroke = Instance.new("UIStroke", MainLogin); Stroke.Color = Color3.fromRGB(50, 120, 255); Stroke.Thickness = 2.5

-- Title (To hơn)
Title.Parent = MainLogin; Title.Text = "CSHELL HUB PREMIUM"; Title.Font = Enum.Font.GothamBold; Title.TextColor3 = Color3.fromRGB(255, 255, 255); Title.TextSize = 26; Title.Size = UDim2.new(1, 0, 0, 70); Title.BackgroundTransparency = 1

-- Input (To hơn)
KeyInput.Parent = MainLogin; KeyInput.PlaceholderText = "Enter key here..."; KeyInput.Text = ""; KeyInput.BackgroundColor3 = Color3.fromRGB(25, 25, 35); KeyInput.Position = UDim2.new(0.1, 0, 0.35, 0); KeyInput.Size = UDim2.new(0.8, 0, 0, 50); KeyInput.TextColor3 = Color3.fromRGB(255, 255, 255); KeyInput.Font = Enum.Font.Gotham; KeyInput.TextSize = 18; Instance.new("UICorner", KeyInput)

-- Buttons (To hơn)
LoginBtn.Parent = MainLogin; LoginBtn.Text = "LOGIN"; LoginBtn.BackgroundColor3 = Color3.fromRGB(50, 120, 255); LoginBtn.Position = UDim2.new(0.1, 0, 0.62, 0); LoginBtn.Size = UDim2.new(0.38, 0, 0, 50); LoginBtn.TextColor3 = Color3.fromRGB(255, 255, 255); LoginBtn.Font = Enum.Font.GothamBold; LoginBtn.TextSize = 18; Instance.new("UICorner", LoginBtn)
GetKeyBtn.Parent = MainLogin; GetKeyBtn.Text = "GET KEY"; GetKeyBtn.BackgroundColor3 = Color3.fromRGB(40, 40, 50); GetKeyBtn.Position = UDim2.new(0.52, 0, 0.62, 0); GetKeyBtn.Size = UDim2.new(0.38, 0, 0, 50); GetKeyBtn.TextColor3 = Color3.fromRGB(255, 255, 255); GetKeyBtn.Font = Enum.Font.GothamBold; GetKeyBtn.TextSize = 18; Instance.new("UICorner", GetKeyBtn)

-- Status (To hơn)
Status.Parent = MainLogin; Status.Text = "Cshell Security System v3"; Status.TextColor3 = Color3.fromRGB(180, 180, 180); Status.Position = UDim2.new(0, 0, 0.88, 0); Status.Size = UDim2.new(1, 0, 0, 25); Status.BackgroundTransparency = 1; Status.Font = Enum.Font.Gotham; Status.TextSize = 14

local function RequestAPI(url, method, body)
    local req = (syn and syn.request) or (http and http.request) or http_request or (fluxus and fluxus.request) or request
    if not req then return nil end
    local res = req({ Url = url, Method = method or "GET", Headers = {["Content-Type"]="application/json"}, Body = body and HttpService:JSONEncode(body) or nil })
    return HttpService:JSONDecode(res.Body)
end

local function Verify(key)
    Status.Text = "Verifying Key..."; Status.TextColor3 = Color3.fromRGB(255, 255, 255)
    local res = RequestAPI(Config.ApiURL, "POST", {
        appId = Config.AppID,
        secret = Config.Secret,
        key = key,
        hwid = game:GetService("RbxAnalyticsService"):GetClientId()
    })

    if res and res.success then
        Status.Text = "Success! Loading Hub..."; Status.TextColor3 = Color3.fromRGB(0, 255, 0); wait(0.5)
        local success, result = pcall(function()
            local source = game:HttpGet(Config.MainLnk)
            local func, err = loadstring(source)
            if not func then return error(err) end
            return func()
        end)
        
        if success then
            CshellLogin:Destroy()
        else
            Status.Text = "Error: " .. tostring(result):sub(1, 40)
            Status.TextColor3 = Color3.fromRGB(255, 50, 50)
            warn("Cshell HUB Error: " .. tostring(result))
        end
    else
        Status.Text = res and res.message or "Invalid Key!"; Status.TextColor3 = Color3.fromRGB(255, 50, 50)
    end
end

LoginBtn.MouseButton1Click:Connect(function() Verify(KeyInput.Text) end)
GetKeyBtn.MouseButton1Click:Connect(function() setclipboard(Config.GetKey); Status.Text = "Link copied to clipboard!" end)

if isfile(Config.SaveFile) then
    KeyInput.Text = readfile(Config.SaveFile)
    spawn(function() Verify(KeyInput.Text) end)
end
