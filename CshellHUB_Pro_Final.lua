-- [[ CSHELL HUB PREMIUM - FINAL MASTER VERSION ]] --
local UserInputService = game:GetService("UserInputService")
local TweenService = game:GetService("TweenService")
local HttpService = game:GetService("HttpService")
local CoreGui = game:GetService("CoreGui")
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

-- [[ CONFIG ]] --
local Config = {
    AppID = "69ecc99e4303c295321d3531",
    Secret = "4697f72a86fbf75563ef8c2b5755f0c3abffc21f",
    ApiURL = "https://cshellvn.vercel.app/api/client/verify",
    GetKey = "https://cshellvn.vercel.app/getkey",
    SaveFile = "CshellHUB_Key.txt"
}

-- [[ DRAGGABLE FUNCTION ]] --
local function MakeDraggable(frame, parent)
    parent = parent or frame
    local dragging, dragInput, dragStart, startPos
    frame.InputBegan:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch then
            dragging = true; dragStart = input.Position; startPos = parent.Position
            input.Changed:Connect(function() if input.UserInputState == Enum.UserInputState.End then dragging = false end end)
        end
    end)
    frame.InputChanged:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseMovement or input.UserInputType == Enum.UserInputType.Touch then dragInput = input end
    end)
    UserInputService.InputChanged:Connect(function(input)
        if input == dragInput and dragging then
            local delta = input.Position - dragStart
            parent.Position = UDim2.new(startPos.X.Scale, startPos.X.Offset + delta.X, startPos.Y.Scale, startPos.Y.Offset + delta.Y)
        end
    end)
end

-- [[ MAIN HUB ]] --
local function LoadMainHub()
    if CoreGui:FindFirstChild("CshellHub") then CoreGui.CshellHub:Destroy() end
    local CshellHub = Instance.new("ScreenGui"); CshellHub.Name = "CshellHub"; CshellHub.Parent = CoreGui
    
    -- Main Frame
    local MainFrame = Instance.new("Frame")
    MainFrame.Name = "MainFrame"; MainFrame.Parent = CshellHub; MainFrame.BackgroundColor3 = Color3.fromRGB(15, 15, 20); MainFrame.Position = UDim2.new(0.5, -250, 0.5, -175); MainFrame.Size = UDim2.new(0, 500, 0, 350); MainFrame.Visible = true
    Instance.new("UICorner", MainFrame).CornerRadius = UDim.new(0, 15)
    Instance.new("UIStroke", MainFrame).Color = Color3.fromRGB(50, 120, 255)
    
    local Title = Instance.new("TextLabel")
    Title.Parent = MainFrame; Title.Text = "CSHELL HUB PREMIUM"; Title.Font = Enum.Font.GothamBold; Title.TextColor3 = Color3.fromRGB(255, 255, 255); Title.TextSize = 28; Title.Size = UDim2.new(1, 0, 0, 60); Title.BackgroundTransparency = 1
    MakeDraggable(Title, MainFrame)
    
    -- Toggle Button (Nút bấm ẩn hiện)
    local ToggleBtn = Instance.new("TextButton")
    ToggleBtn.Name = "ToggleBtn"; ToggleBtn.Parent = CshellHub; ToggleBtn.BackgroundColor3 = Color3.fromRGB(50, 120, 255); ToggleBtn.Position = UDim2.new(0, 50, 0.5, 0); ToggleBtn.Size = UDim2.new(0, 60, 0, 60); ToggleBtn.Text = "CS"; ToggleBtn.TextColor3 = Color3.fromRGB(255, 255, 255); ToggleBtn.Font = Enum.Font.GothamBold; ToggleBtn.TextSize = 25
    Instance.new("UICorner", ToggleBtn).CornerRadius = UDim.new(1, 0)
    Instance.new("UIStroke", ToggleBtn).Color = Color3.fromRGB(255, 255, 255)
    MakeDraggable(ToggleBtn)

    ToggleBtn.MouseButton1Click:Connect(function()
        MainFrame.Visible = not MainFrame.Visible
    end)

    local FarmBtn = Instance.new("TextButton")
    FarmBtn.Parent = MainFrame; FarmBtn.Text = "AUTO FARM: OFF"; FarmBtn.BackgroundColor3 = Color3.fromRGB(40, 40, 50); FarmBtn.Position = UDim2.new(0.1, 0, 0.25, 0); FarmBtn.Size = UDim2.new(0.8, 0, 0, 60); FarmBtn.TextColor3 = Color3.fromRGB(255, 255, 255); FarmBtn.Font = Enum.Font.GothamBold; FarmBtn.TextSize = 24; Instance.new("UICorner", FarmBtn)
end

-- [[ LOGIN UI ]] --
if CoreGui:FindFirstChild("CshellLogin") then CoreGui.CshellLogin:Destroy() end
local CshellLogin = Instance.new("ScreenGui"); CshellLogin.Name = "CshellLogin"; CshellLogin.Parent = CoreGui
local MainLogin = Instance.new("Frame")
MainLogin.Parent = CshellLogin; MainLogin.BackgroundColor3 = Color3.fromRGB(15, 15, 20); MainLogin.Position = UDim2.new(0.5, -200, 0.5, -150); MainLogin.Size = UDim2.new(0, 400, 0, 300)
Instance.new("UICorner", MainLogin).CornerRadius = UDim.new(0, 20)
Instance.new("UIStroke", MainLogin).Color = Color3.fromRGB(50, 120, 255)

local LoginTitle = Instance.new("TextLabel")
LoginTitle.Parent = MainLogin; LoginTitle.Text = "CSHELL LOGIN"; LoginTitle.Font = Enum.Font.GothamBold; LoginTitle.TextColor3 = Color3.fromRGB(255, 255, 255); LoginTitle.TextSize = 35; LoginTitle.Size = UDim2.new(1, 0, 0, 80); LoginTitle.BackgroundTransparency = 1
MakeDraggable(LoginTitle, MainLogin)

local KeyInput = Instance.new("TextBox")
KeyInput.Parent = MainLogin; KeyInput.PlaceholderText = "Enter Key..."; KeyInput.BackgroundColor3 = Color3.fromRGB(25, 25, 35); KeyInput.Position = UDim2.new(0.1, 0, 0.35, 0); KeyInput.Size = UDim2.new(0.8, 0, 0, 55); KeyInput.TextColor3 = Color3.fromRGB(255, 255, 255); KeyInput.TextSize = 22; Instance.new("UICorner", KeyInput)

local LoginBtn = Instance.new("TextButton")
LoginBtn.Parent = MainLogin; LoginBtn.Text = "LOGIN"; LoginBtn.BackgroundColor3 = Color3.fromRGB(50, 120, 255); LoginBtn.Position = UDim2.new(0.1, 0, 0.62, 0); LoginBtn.Size = UDim2.new(0.38, 0, 0, 55); LoginBtn.TextColor3 = Color3.fromRGB(255, 255, 255); LoginBtn.Font = Enum.Font.GothamBold; LoginBtn.TextSize = 20; Instance.new("UICorner", LoginBtn)

local GetKeyBtn = Instance.new("TextButton")
GetKeyBtn.Parent = MainLogin; GetKeyBtn.Text = "GET KEY"; GetKeyBtn.BackgroundColor3 = Color3.fromRGB(40, 40, 50); GetKeyBtn.Position = UDim2.new(0.52, 0, 0.62, 0); GetKeyBtn.Size = UDim2.new(0.38, 0, 0, 55); GetKeyBtn.TextColor3 = Color3.fromRGB(255, 255, 255); GetKeyBtn.Font = Enum.Font.GothamBold; GetKeyBtn.TextSize = 20; Instance.new("UICorner", GetKeyBtn)

local Status = Instance.new("TextLabel")
Status.Parent = MainLogin; Status.Text = "Waiting for Login..."; Status.TextColor3 = Color3.fromRGB(180, 180, 180); Status.Position = UDim2.new(0, 0, 0.9, 0); Status.Size = UDim2.new(1, 0, 0, 25); Status.BackgroundTransparency = 1; Status.Font = Enum.Font.Gotham; Status.TextSize = 14

-- API Request
local function RequestAPI(url, body)
    local req = (syn and syn.request) or (http and http.request) or http_request or (fluxus and fluxus.request) or request
    local res = req({ Url = url, Method = "POST", Headers = {["Content-Type"]="application/json"}, Body = HttpService:JSONEncode(body) })
    return HttpService:JSONDecode(res.Body)
end

local function Verify(key)
    Status.Text = "Verifying Key..."; Status.TextColor3 = Color3.fromRGB(255, 255, 255)
    local success, res = pcall(function()
        return RequestAPI(Config.ApiURL, {appId = Config.AppID, secret = Config.Secret, key = key, hwid = game:GetService("RbxAnalyticsService"):GetClientId()})
    end)

    if success and res and res.success then
        writefile(Config.SaveFile, key)
        CshellLogin:Destroy()
        LoadMainHub()
    else
        Status.Text = res and res.message or "Invalid Key!"; Status.TextColor3 = Color3.fromRGB(255, 50, 50)
    end
end

LoginBtn.MouseButton1Click:Connect(function() Verify(KeyInput.Text) end)
GetKeyBtn.MouseButton1Click:Connect(function() setclipboard(Config.GetKey); Status.Text = "Link copied!" end)

if isfile(Config.SaveFile) then
    KeyInput.Text = readfile(Config.SaveFile)
    spawn(function() Verify(KeyInput.Text) end)
end
