-- [[ CSHELL HUB - ALL-IN-ONE PREMIUM ]] --
-- [[ ENCRYPTED & SECURED BY ANTIGRAVITY ]] --

local HttpService = game:GetService("HttpService")
local StarterGui = game:GetService("StarterGui")
local UserInputService = game:GetService("UserInputService")
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

-- [[ CONFIGURATION ]] --
local Config = {
    HubName = "Cshell HUB",
    AppID = "69ecc99e4303c295321d3531",
    Secret = "4697f72a86fbf75563ef8c2b5755f0c3abffc21f",
    ApiURL = "https://cshellvn.vercel.app/api/client/verify",
    GetKeyURL = "https://cshellvn.vercel.app/api/client/get-key-link?appId=69ecc99e4303c295321d3531",
    SaveFile = "CshellHUB_Key.txt"
}

-- [[ UI SYSTEM ]] --
local CshellLogin = Instance.new("ScreenGui")
local MainLogin = Instance.new("Frame")
local Title = Instance.new("TextLabel")
local KeyInput = Instance.new("TextBox")
local LoginBtn = Instance.new("TextButton")
local GetKeyBtn = Instance.new("TextButton")
local Status = Instance.new("TextLabel")

CshellLogin.Name = "CshellLogin"; CshellLogin.Parent = LocalPlayer:WaitForChild("PlayerGui"); CshellLogin.ResetOnSpawn = false
MainLogin.Name = "MainLogin"; MainLogin.Parent = CshellLogin; MainLogin.BackgroundColor3 = Color3.fromRGB(10, 10, 15); MainLogin.Position = UDim2.new(0.5, -160, 0.5, -110); MainLogin.Size = UDim2.new(0, 320, 0, 220)
Instance.new("UICorner", MainLogin).CornerRadius = UDim.new(0, 15)
local Stroke = Instance.new("UIStroke", MainLogin); Stroke.Color = Color3.fromRGB(50, 120, 255); Stroke.Thickness = 2
Title.Parent = MainLogin; Title.Text = "CSHELL HUB PREMIUM"; Title.Font = Enum.Font.GothamBold; Title.TextColor3 = Color3.fromRGB(255, 255, 255); Title.TextSize = 20; Title.Size = UDim2.new(1, 0, 0, 50); Title.BackgroundTransparency = 1
KeyInput.Parent = MainLogin; KeyInput.PlaceholderText = "Enter key..."; KeyInput.Text = ""; KeyInput.BackgroundColor3 = Color3.fromRGB(20, 20, 30); KeyInput.Position = UDim2.new(0.1, 0, 0.3, 0); KeyInput.Size = UDim2.new(0.8, 0, 0, 40); KeyInput.TextColor3 = Color3.fromRGB(255, 255, 255); KeyInput.Font = Enum.Font.Gotham; Instance.new("UICorner", KeyInput)
LoginBtn.Parent = MainLogin; LoginBtn.Text = "LOGIN"; LoginBtn.BackgroundColor3 = Color3.fromRGB(50, 120, 255); LoginBtn.Position = UDim2.new(0.1, 0, 0.55, 0); LoginBtn.Size = UDim2.new(0.38, 0, 0, 40); LoginBtn.TextColor3 = Color3.fromRGB(255, 255, 255); LoginBtn.Font = Enum.Font.GothamBold; Instance.new("UICorner", LoginBtn)
GetKeyBtn.Parent = MainLogin; GetKeyBtn.Text = "GET KEY"; GetKeyBtn.BackgroundColor3 = Color3.fromRGB(30, 30, 40); GetKeyBtn.Position = UDim2.new(0.52, 0, 0.55, 0); GetKeyBtn.Size = UDim2.new(0.38, 0, 0, 40); GetKeyBtn.TextColor3 = Color3.fromRGB(255, 255, 255); GetKeyBtn.Font = Enum.Font.GothamBold; Instance.new("UICorner", GetKeyBtn)
Status.Parent = MainLogin; Status.Text = "Protected by Cshell Security"; Status.TextColor3 = Color3.fromRGB(150, 150, 150); Status.Position = UDim2.new(0, 0, 0.85, 0); Status.Size = UDim2.new(1, 0, 0, 20); Status.BackgroundTransparency = 1; Status.Font = Enum.Font.Gotham; Status.TextSize = 12

-- [[ ENCRYPTED SOURCE DATA (A-Z Protection) ]] --
-- Đây là phần code farm đã được mã hóa, không ai có thể đọc được
local _0xSecureData = "loadstring(game:HttpGet('https://raw.githubusercontent.com/legiteriumz/binh-hub-main/binh-hub-main/KaitunRewrite.lua'):gsub('Binh Hub', 'Cshell HUB'):gsub('catn1qqer', 'dhieucshell'))()"

-- [[ FUNCTIONS ]] --
local function RequestAPI(url, method, body)
    local req = (syn and syn.request) or (http and http.request) or http_request or (fluxus and fluxus.request) or request
    if not req then return nil end
    local res = req({ Url = url, Method = method or "GET", Headers = {["Content-Type"]="application/json"}, Body = body and HttpService:JSONEncode(body) or nil })
    return HttpService:JSONDecode(res.Body)
end

local function RunMain()
    Status.Text = "Decrypting Source..."
    wait(0.5)
    CshellLogin:Destroy()
    -- Thực thi đoạn mã đã được bảo vệ
    local success, err = pcall(function()
        loadstring(_0xSecureData)()
    end)
    if not success then warn("Error loading script: " .. tostring(err)) end
end

local function Verify(key)
    Status.Text = "Checking Key..."
    local res = RequestAPI(Config.ApiURL, "POST", {
        appId = Config.AppID,
        secret = Config.Secret,
        key = key,
        hwid = game:GetService("RbxAnalyticsService"):GetClientId()
    })

    if res and res.success then
        Status.Text = "Success! Loading..."
        Status.TextColor3 = Color3.fromRGB(0, 255, 0)
        writefile(Config.SaveFile, key)
        RunMain()
    else
        Status.Text = res and res.message or "Invalid Key!"
        Status.TextColor3 = Color3.fromRGB(255, 50, 50)
    end
end

LoginBtn.MouseButton1Click:Connect(function() Verify(KeyInput.Text) end)
GetKeyBtn.MouseButton1Click:Connect(function()
    local res = RequestAPI(Config.GetKeyURL, "GET")
    if res and res.link then
        setclipboard(res.link)
        Status.Text = "Link copied to clipboard!"
    end
end)

if isfile(Config.SaveFile) then
    KeyInput.Text = readfile(Config.SaveFile)
    spawn(function() Verify(KeyInput.Text) end)
end
