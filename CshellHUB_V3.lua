print("--- CSHELL V3 STANDALONE START ---")

local CoreGui = game:GetService("CoreGui")
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

-- [[ LOGIN LOGIC ]] --
local function LoadMainHub()
    print("Loading Main Hub...")
    if CoreGui:FindFirstChild("CshellHub") then CoreGui.CshellHub:Destroy() end
    
    local CshellHub = Instance.new("ScreenGui")
    CshellHub.Name = "CshellHub"; CshellHub.Parent = CoreGui
    
    local MainFrame = Instance.new("Frame")
    MainFrame.Name = "MainFrame"; MainFrame.Parent = CshellHub; MainFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 25); MainFrame.Position = UDim2.new(0.5, -300, 0.5, -200); MainFrame.Size = UDim2.new(0, 600, 0, 400)
    Instance.new("UICorner", MainFrame).CornerRadius = UDim.new(0, 15)
    
    local Title = Instance.new("TextLabel")
    Title.Parent = MainFrame; Title.Text = "CSHELL HUB PREMIUM"; Title.Font = Enum.Font.GothamBold; Title.TextColor3 = Color3.fromRGB(255, 255, 255); Title.TextSize = 30; Title.Size = UDim2.new(1, 0, 0, 60); Title.BackgroundTransparency = 1
    
    local FarmBtn = Instance.new("TextButton")
    FarmBtn.Parent = MainFrame; FarmBtn.Text = "AUTO FARM: OFF"; FarmBtn.BackgroundColor3 = Color3.fromRGB(40, 40, 50); FarmBtn.Position = UDim2.new(0.1, 0, 0.25, 0); FarmBtn.Size = UDim2.new(0.8, 0, 0, 60); FarmBtn.TextColor3 = Color3.fromRGB(255, 255, 255); FarmBtn.Font = Enum.Font.GothamBold; FarmBtn.TextSize = 25; Instance.new("UICorner", FarmBtn)
    
    local isFarming = false
    FarmBtn.MouseButton1Click:Connect(function()
        isFarming = not isFarming
        FarmBtn.Text = "AUTO FARM: " .. (isFarming and "ON" or "OFF")
        FarmBtn.BackgroundColor3 = isFarming and Color3.fromRGB(50, 150, 50) or Color3.fromRGB(40, 40, 50)
        -- Logic Farm ở đây
    end)
    
    print("Main Hub Loaded!")
end

-- [[ LOGIN UI ]] --
if CoreGui:FindFirstChild("CshellLogin") then CoreGui.CshellLogin:Destroy() end
local CshellLogin = Instance.new("ScreenGui")
CshellLogin.Name = "CshellLogin"; CshellLogin.Parent = CoreGui

local MainLogin = Instance.new("Frame")
MainLogin.Parent = CshellLogin; MainLogin.BackgroundColor3 = Color3.fromRGB(15, 15, 20); MainLogin.Position = UDim2.new(0.5, -200, 0.5, -150); MainLogin.Size = UDim2.new(0, 400, 0, 300)
Instance.new("UICorner", MainLogin).CornerRadius = UDim.new(0, 20)

local Title = Instance.new("TextLabel")
Title.Parent = MainLogin; Title.Text = "CSHELL LOGIN"; Title.Font = Enum.Font.GothamBold; Title.TextColor3 = Color3.fromRGB(255, 255, 255); Title.TextSize = 40; Title.Size = UDim2.new(1, 0, 0, 80); Title.BackgroundTransparency = 1

local KeyInput = Instance.new("TextBox")
KeyInput.Parent = MainLogin; KeyInput.PlaceholderText = "Enter Key..."; KeyInput.BackgroundColor3 = Color3.fromRGB(25, 25, 35); KeyInput.Position = UDim2.new(0.1, 0, 0.35, 0); KeyInput.Size = UDim2.new(0.8, 0, 0, 60); KeyInput.TextColor3 = Color3.fromRGB(255, 255, 255); KeyInput.TextSize = 25; Instance.new("UICorner", KeyInput)

local LoginBtn = Instance.new("TextButton")
LoginBtn.Parent = MainLogin; LoginBtn.Text = "LOGIN"; LoginBtn.BackgroundColor3 = Color3.fromRGB(50, 120, 255); LoginBtn.Position = UDim2.new(0.1, 0, 0.65, 0); LoginBtn.Size = UDim2.new(0.8, 0, 0, 60); LoginBtn.TextColor3 = Color3.fromRGB(255, 255, 255); LoginBtn.Font = Enum.Font.GothamBold; LoginBtn.TextSize = 25; Instance.new("UICorner", LoginBtn)

LoginBtn.MouseButton1Click:Connect(function()
    -- Tạm thời cho login thẳng để bro test giao diện
    CshellLogin:Destroy()
    LoadMainHub()
end)

print("--- CSHELL READY ---")
