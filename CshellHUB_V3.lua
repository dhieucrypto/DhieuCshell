print("--- CSHELL V3 START ---")

local _0xDecode = function(t) local s = "" for _, v in ipairs(t) do s = s .. string.char(v) end return s end

local Config = {
    AppID = "69ecc99e4303c295321d3531",
    Secret = "4697f72a86fbf75563ef8c2b5755f0c3abffc21f",
    ApiURL = "https://cshellvn.vercel.app/api/client/verify",
    GetKey = "https://cshellvn.vercel.app/getkey",
    SaveFile = "CshellHUB_Key.txt"
}

local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer
local CoreGui = game:GetService("CoreGui")

print("1. Creating Login UI...")

-- Xóa UI cũ nếu có
if CoreGui:FindFirstChild("CshellLogin") then CoreGui.CshellLogin:Destroy() end

local CshellLogin = Instance.new("ScreenGui")
local MainLogin = Instance.new("Frame")
local Title = Instance.new("TextLabel")
local KeyInput = Instance.new("TextBox")
local LoginBtn = Instance.new("TextButton")
local GetKeyBtn = Instance.new("TextButton")
local Status = Instance.new("TextLabel")

CshellLogin.Name = "CshellLogin"; CshellLogin.Parent = CoreGui; CshellLogin.ResetOnSpawn = false
MainLogin.Name = "MainLogin"; MainLogin.Parent = CshellLogin; MainLogin.BackgroundColor3 = Color3.fromRGB(15, 15, 20); MainLogin.Position = UDim2.new(0.5, -200, 0.5, -150); MainLogin.Size = UDim2.new(0, 400, 0, 300)
Instance.new("UICorner", MainLogin).CornerRadius = UDim.new(0, 20)
local Stroke = Instance.new("UIStroke", MainLogin); Stroke.Color = Color3.fromRGB(50, 120, 255); Stroke.Thickness = 3

Title.Parent = MainLogin; Title.Text = "CSHELL HUB"; Title.Font = Enum.Font.GothamBold; Title.TextColor3 = Color3.fromRGB(255, 255, 255); Title.TextSize = 45; Title.Size = UDim2.new(1, 0, 0, 80); Title.BackgroundTransparency = 1
KeyInput.Parent = MainLogin; KeyInput.PlaceholderText = "Enter Key..."; KeyInput.Text = ""; KeyInput.BackgroundColor3 = Color3.fromRGB(25, 25, 35); KeyInput.Position = UDim2.new(0.1, 0, 0.35, 0); KeyInput.Size = UDim2.new(0.8, 0, 0, 60); KeyInput.TextColor3 = Color3.fromRGB(255, 255, 255); KeyInput.Font = Enum.Font.Gotham; KeyInput.TextSize = 24; Instance.new("UICorner", KeyInput)
LoginBtn.Parent = MainLogin; LoginBtn.Text = "LOGIN"; LoginBtn.BackgroundColor3 = Color3.fromRGB(50, 120, 255); LoginBtn.Position = UDim2.new(0.1, 0, 0.65, 0); LoginBtn.Size = UDim2.new(0.38, 0, 0, 60); LoginBtn.TextColor3 = Color3.fromRGB(255, 255, 255); LoginBtn.Font = Enum.Font.GothamBold; LoginBtn.TextSize = 24; Instance.new("UICorner", LoginBtn)
GetKeyBtn.Parent = MainLogin; GetKeyBtn.Text = "GET KEY"; GetKeyBtn.BackgroundColor3 = Color3.fromRGB(40, 40, 50); GetKeyBtn.Position = UDim2.new(0.52, 0, 0.65, 0); GetKeyBtn.Size = UDim2.new(0.38, 0, 0, 60); GetKeyBtn.TextColor3 = Color3.fromRGB(255, 255, 255); GetKeyBtn.Font = Enum.Font.GothamBold; GetKeyBtn.TextSize = 24; Instance.new("UICorner", GetKeyBtn)
Status.Parent = MainLogin; Status.Text = "Cshell V3 Loaded!"; Status.TextColor3 = Color3.fromRGB(180, 180, 180); Status.Position = UDim2.new(0, 0, 0.9, 0); Status.Size = UDim2.new(1, 0, 0, 25); Status.BackgroundTransparency = 1; Status.Font = Enum.Font.Gotham; Status.TextSize = 18

print("2. UI Created Successfully!")

local function RequestAPI(url, method, body)
    local req = (syn and syn.request) or (http and http.request) or http_request or (fluxus and fluxus.request) or request
    if not req then return nil end
    local res = req({ Url = url, Method = method or "GET", Headers = {["Content-Type"]="application/json"}, Body = body and HttpService:JSONEncode(body) or nil })
    return HttpService:JSONDecode(res.Body)
end

local function LoadHub()
    print("3. Verification Success! Loading Orion Hub...")
    CshellLogin:Destroy()
    local OrionLib = loadstring(game:HttpGet(('https://raw.githubusercontent.com/shlexware/Orion/main/source')))()
    local Window = OrionLib:MakeWindow({Name = "Cshell HUB Lite", HidePremium = true, SaveConfig = true, ConfigFolder = "CshellHUB"})
    local FarmTab = Window:MakeTab({Name = "Auto Farm", Icon = "rbxassetid://4483345998"})
    FarmTab:AddToggle({Name = "Auto Farm Level", Default = false, Callback = function(Value) _G.AutoFarm = Value end})
    OrionLib:Init()
end

local function Verify(key)
    Status.Text = "Verifying..."; Status.TextColor3 = Color3.fromRGB(255, 255, 255)
    local res = RequestAPI(Config.ApiURL, "POST", {
        appId = Config.AppID,
        secret = Config.Secret,
        key = key,
        hwid = game:GetService("RbxAnalyticsService"):GetClientId()
    })

    if res and res.success then
        writefile(Config.SaveFile, key)
        Status.Text = "Success!"; Status.TextColor3 = Color3.fromRGB(0, 255, 0)
        wait(0.3)
        LoadHub()
    else
        Status.Text = res and res.message or "Invalid Key!"; Status.TextColor3 = Color3.fromRGB(255, 50, 50)
    end
end

LoginBtn.MouseButton1Click:Connect(function() Verify(KeyInput.Text) end)
GetKeyBtn.MouseButton1Click:Connect(function() setclipboard(Config.GetKey); Status.Text = "Link Copied!" end)

if isfile(Config.SaveFile) then
    local k = readfile(Config.SaveFile)
    KeyInput.Text = k
    spawn(function() Verify(k) end)
end

print("--- CSHELL V3 READY ---")
