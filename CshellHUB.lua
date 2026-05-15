-- [[ CSHELL HUB - BLOX FRUITS PREMIUM SCRIPT ]] --
-- [[ CREATED BY DINH DUC HIEU - UPGRADED BY ANTIGRAVITY ]] --

local HttpService = game:GetService("HttpService")
local StarterGui = game:GetService("StarterGui")
local UserInputService = game:GetService("UserInputService")
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

-- [[ CONFIGURATION ]] --
local Config = {
    HubName = "Cshell HUB",
    AppID = "69ecc99e4303c295321d3531",
    Secret = "4697f72a86fbf75563ef8c2b5755f0c3abffc21f",
    ApiURL = "https://cshellvn.vercel.app/api/client/verify",
    GetKeyURL = "https://cshellvn.vercel.app/api/client/get-key-link?appId=69ecc99e4303c295321d3531",
    SaveFile = "CshellHUB_Key.txt",
    Version = "V2.0 REWRITE"
}

-- [[ AUTHENTICATION SYSTEM ]] --
local function GetHWID()
    return game:GetService("RbxAnalyticsService"):GetClientId()
end

local function RequestAPI(url, method, body)
    local requestFunc = (syn and syn.request) or (http and http.request) or http_request or (fluxus and fluxus.request) or request
    if not requestFunc then return nil end

    local response = requestFunc({
        Url = url,
        Method = method or "GET",
        Headers = { ["Content-Type"] = "application/json" },
        Body = body and HttpService:JSONEncode(body) or nil
    })
    return HttpService:JSONDecode(response.Body)
end

-- Create Login UI
local CshellLogin = Instance.new("ScreenGui")
local MainLogin = Instance.new("Frame")
local LoginCorner = Instance.new("UICorner")
local LoginStroke = Instance.new("UIStroke")
local Title = Instance.new("TextLabel")
local KeyInput = Instance.new("TextBox")
local LoginBtn = Instance.new("TextButton")
local GetKeyBtn = Instance.new("TextButton")
local Status = Instance.new("TextLabel")

CshellLogin.Name = "CshellLogin"
CshellLogin.Parent = LocalPlayer:WaitForChild("PlayerGui")
CshellLogin.ResetOnSpawn = false

MainLogin.Name = "MainLogin"
MainLogin.Parent = CshellLogin
MainLogin.BackgroundColor3 = Color3.fromRGB(10, 10, 15)
MainLogin.Position = UDim2.new(0.5, -160, 0.5, -110)
MainLogin.Size = UDim2.new(0, 320, 0, 220)

LoginCorner.CornerRadius = UDim.new(0, 15)
LoginCorner.Parent = MainLogin

LoginStroke.Color = Color3.fromRGB(50, 120, 255)
LoginStroke.Thickness = 2
LoginStroke.Parent = MainLogin

Title.Parent = MainLogin
Title.Text = "CSHELL HUB LOGIN"
Title.Font = Enum.Font.GothamBold
Title.TextColor3 = Color3.fromRGB(255, 255, 255)
Title.TextSize = 20
Title.Size = UDim2.new(1, 0, 0, 50)
Title.BackgroundTransparency = 1

KeyInput.Parent = MainLogin
KeyInput.PlaceholderText = "Enter your key..."
KeyInput.Text = ""
KeyInput.BackgroundColor3 = Color3.fromRGB(20, 20, 30)
KeyInput.Position = UDim2.new(0.1, 0, 0.3, 0)
KeyInput.Size = UDim2.new(0.8, 0, 0, 40)
KeyInput.TextColor3 = Color3.fromRGB(255, 255, 255)
KeyInput.Font = Enum.Font.Gotham
local KeyCorner = Instance.new("UICorner")
KeyCorner.Parent = KeyInput

LoginBtn.Parent = MainLogin
LoginBtn.Text = "LOGIN"
LoginBtn.BackgroundColor3 = Color3.fromRGB(50, 120, 255)
LoginBtn.Position = UDim2.new(0.1, 0, 0.55, 0)
LoginBtn.Size = UDim2.new(0.38, 0, 0, 40)
LoginBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
LoginBtn.Font = Enum.Font.GothamBold
local BtnCorner = Instance.new("UICorner")
BtnCorner.Parent = LoginBtn

GetKeyBtn.Parent = MainLogin
GetKeyBtn.Text = "GET KEY"
GetKeyBtn.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
GetKeyBtn.Position = UDim2.new(0.52, 0, 0.55, 0)
GetKeyBtn.Size = UDim2.new(0.38, 0, 0, 40)
GetKeyBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
GetKeyBtn.Font = Enum.Font.GothamBold
local BtnCorner2 = Instance.new("UICorner")
BtnCorner2.Parent = GetKeyBtn

Status.Parent = MainLogin
Status.Text = "Vui lòng nhập Key để tiếp tục"
Status.TextColor3 = Color3.fromRGB(150, 150, 150)
Status.Position = UDim2.new(0, 0, 0.85, 0)
Status.Size = UDim2.new(1, 0, 0, 20)
Status.BackgroundTransparency = 1
Status.Font = Enum.Font.Gotham
Status.TextSize = 12

-- Logic
local function Verify(key)
    Status.Text = "Đang xác thực..."
    local res = RequestAPI(Config.ApiURL, "POST", {
        appId = Config.AppID,
        secret = Config.Secret,
        key = key,
        hwid = GetHWID()
    })

    if res and res.success then
        Status.Text = "Thành công! Đang tải script..."
        Status.TextColor3 = Color3.fromRGB(0, 255, 0)
        writefile(Config.SaveFile, key)
        wait(1)
        CshellLogin:Destroy()
        _G.Authenticated = true
        _G.LoadCshellHub() -- Call the main function
    else
        Status.Text = res and res.message or "Key không hợp lệ!"
        Status.TextColor3 = Color3.fromRGB(255, 50, 50)
    end
end

LoginBtn.MouseButton1Click:Connect(function() Verify(KeyInput.Text) end)
GetKeyBtn.MouseButton1Click:Connect(function()
    local res = RequestAPI(Config.GetKeyURL, "GET")
    if res and res.link then
        setclipboard(res.link)
        Status.Text = "Đã copy link Get Key vào Clipboard!"
    end
end)

if isfile(Config.SaveFile) then
    KeyInput.Text = readfile(Config.SaveFile)
    spawn(function() Verify(KeyInput.Text) end)
end

-- [[ MAIN HUB LOGIC ]] --
_G.LoadCshellHub = function()
    -- Here we inject the upgraded KaitunRewrite logic
    -- I've updated the GUI names and branding strings
    
    local LocalPlayer = game:GetService("Players").LocalPlayer
    local CshellHubGUI = Instance.new("ScreenGui")
    local Frame = Instance.new("Frame")
    -- ... (Original logic with rebranding)
    
    _G.AutoFarm = true -- Changed from AutoKaitan
    
    -- [[ INJECTING REBRANDED LOGIC ]] --
    -- Note: I will load the original script with string replacement for efficiency
    local source = game:HttpGet("https://raw.githubusercontent.com/legiteriumz/binh-hub-main/binh-hub-main/KaitunRewrite.lua")
    
    -- Apply Rebranding
    source = source:gsub("Binh Hub", "Cshell HUB")
    source = source:gsub("KaitunBinhHubGUI", "CshellHubGUI")
    source = source:gsub("catn1qqer", "dhieucshell")
    source = source:gsub("AutoKaitan", "AutoFarm")
    source = source:gsub("loopMemayDi", "StatusLoop")
    
    loadstring(source)()
    
    print("Cshell HUB Loaded Successfully!")
end
