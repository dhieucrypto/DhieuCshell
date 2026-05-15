-- [[ CSHELL HUB PREMIUM - PRO LOADER ]] --
repeat wait() until game:IsLoaded()

local UserInputService = game:GetService("UserInputService")
local CoreGui = game:GetService("CoreGui")
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

-- [[ DRAGGABLE SYSTEM ]] --
local function MakeDraggable(dragPart, parent)
    local dragging, dragInput, dragStart, startPos
    dragPart.InputBegan:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch then
            dragging = true; dragStart = input.Position; startPos = parent.Position
            input.Changed:Connect(function() if input.UserInputState == Enum.UserInputState.End then dragging = false end end)
        end
    end)
    dragPart.InputChanged:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseMovement or input.UserInputType == Enum.UserInputType.Touch then dragInput = input end
    end)
    UserInputService.InputChanged:Connect(function(input)
        if input == dragInput and dragging then
            local delta = input.Position - dragStart
            parent.Position = UDim2.new(startPos.X.Scale, startPos.X.Offset + delta.X, startPos.Y.Scale, startPos.Y.Offset + delta.Y)
        end
    end)
end

-- [[ LOAD REAL SCRIPT LOGIC ]] --
local function LaunchRealScript()
    print("Launching Redz Hub Logic...")
    -- Thiết lập mặc định cho Redz Hub
    _G.Settings = {
        JoinTeam = "Pirates",
        Translator = true
    }
    -- Load bộ logic farm xịn nhất hiện nay
    loadstring(game:HttpGet("https://raw.githubusercontent.com/realredz/BloxFruits/refs/heads/main/Source.lua"))(_G.Settings)
end

-- [[ LOGIN UI - PREMIUM DESIGN ]] --
if CoreGui:FindFirstChild("CshellLogin") then CoreGui.CshellLogin:Destroy() end
local CshellLogin = Instance.new("ScreenGui"); CshellLogin.Name = "CshellLogin"; CshellLogin.Parent = CoreGui

local Main = Instance.new("Frame")
Main.Parent = CshellLogin; Main.BackgroundColor3 = Color3.fromRGB(15, 15, 20); Main.Position = UDim2.new(0.5, -200, 0.5, -150); Main.Size = UDim2.new(0, 400, 0, 300)
Instance.new("UICorner", Main).CornerRadius = UDim.new(0, 20); Instance.new("UIStroke", Main).Color = Color3.fromRGB(50, 120, 255)

local T = Instance.new("TextLabel")
T.Parent = Main; T.Text = "CSHELL HUB PRO"; T.Font = Enum.Font.GothamBold; T.TextColor3 = Color3.fromRGB(255, 255, 255); T.TextSize = 35; T.Size = UDim2.new(1, 0, 0, 80); T.BackgroundTransparency = 1; MakeDraggable(T, Main)

local K = Instance.new("TextBox")
K.Parent = Main; K.PlaceholderText = "Enter Key..."; K.BackgroundColor3 = Color3.fromRGB(25, 25, 35); K.Position = UDim2.new(0.1, 0, 0.35, 0); K.Size = UDim2.new(0.8, 0, 0, 60); K.TextColor3 = Color3.fromRGB(255, 255, 255); K.TextSize = 25; Instance.new("UICorner", K)

local B1 = Instance.new("TextButton")
B1.Parent = Main; B1.Text = "LOGIN"; B1.BackgroundColor3 = Color3.fromRGB(50, 120, 255); B1.Position = UDim2.new(0.1, 0, 0.65, 0); B1.Size = UDim2.new(0.38, 0, 0, 65); B1.TextColor3 = Color3.fromRGB(255, 255, 255); B1.Font = Enum.Font.GothamBold; B1.TextSize = 22; Instance.new("UICorner", B1)

local B2 = Instance.new("TextButton")
B2.Parent = Main; B2.Text = "GET KEY"; B2.BackgroundColor3 = Color3.fromRGB(40, 40, 50); B2.Position = UDim2.new(0.52, 0, 0.65, 0); B2.Size = UDim2.new(0.38, 0, 0, 65); B2.TextColor3 = Color3.fromRGB(255, 255, 255); B2.Font = Enum.Font.GothamBold; B2.TextSize = 22; Instance.new("UICorner", B2)

B1.MouseButton1Click:Connect(function() 
    CshellLogin:Destroy()
    LaunchRealScript()
end)

B2.MouseButton1Click:Connect(function() setclipboard("https://cshellvn.vercel.app/getkey") end)

print("--- CSHELL PRO READY ---")
