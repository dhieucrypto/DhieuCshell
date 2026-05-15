-- [[ CSHELL HUB PREMIUM - FULL AUTO FARM VERSION ]] --
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

-- [[ GLOBAL SETTINGS ]] --
_G.AutoFarm = false
_G.FastAttack = true

-- [[ DRAGGABLE ]] --
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

-- [[ CORE FARM LOGIC ]] --
local function EquipWeapon()
    for i,v in pairs(LocalPlayer.Backpack:GetChildren()) do
        if v:IsA("Tool") and v.ToolTip == "Melee" then
            LocalPlayer.Character.Humanoid:EquipTool(v)
        end
    end
end

local function GetQuest()
    local level = LocalPlayer.Data.Level.Value
    if level >= 0 and level < 10 then
        return "BanditQuest1", "Bandit", CFrame.new(1060, 16, 1547), CFrame.new(1145, 17, 1634)
    elseif level >= 10 and level < 15 then
        return "JungleQuest", "Monkey", CFrame.new(-1601, 37, 153), CFrame.new(-1623, 37, 153)
    end
    -- Sẽ cập nhật thêm đầy đủ các quest khác
    return "BanditQuest1", "Bandit", CFrame.new(1060, 16, 1547), CFrame.new(1145, 17, 1634)
end

spawn(function()
    while wait() do
        if _G.AutoFarm then
            pcall(function()
                local qName, mName, qPos, mPos = GetQuest()
                if not LocalPlayer.PlayerGui.Main.Quest.Visible then
                    -- Đi nhận Quest
                    LocalPlayer.Character.HumanoidRootPart.CFrame = qPos
                    wait(0.5)
                    local args = {[1] = "StartQuest", [2] = qName, [3] = 1}
                    game:GetService("ReplicatedStorage").Remotes.CommF_:InvokeServer(unpack(args))
                else
                    -- Đi đánh quái
                    local target = nil
                    for i,v in pairs(game:GetService("Workspace").Enemies:GetChildren()) do
                        if v.Name == mName and v:FindFirstChild("Humanoid") and v.Humanoid.Health > 0 then
                            target = v
                            break
                        end
                    end
                    
                    if target then
                        EquipWeapon()
                        LocalPlayer.Character.HumanoidRootPart.CFrame = target.HumanoidRootPart.CFrame * CFrame.new(0, 5, 0)
                        game:GetService("VirtualUser"):CaptureController()
                        game:GetService("VirtualUser"):Button1Down(Vector2.new(1280, 672))
                    else
                        LocalPlayer.Character.HumanoidRootPart.CFrame = mPos
                    end
                end
            end)
        end
    end
end)

-- [[ MAIN HUB UI ]] --
local function LoadMainHub()
    if CoreGui:FindFirstChild("CshellHub") then CoreGui.CshellHub:Destroy() end
    local CshellHub = Instance.new("ScreenGui"); CshellHub.Name = "CshellHub"; CshellHub.Parent = CoreGui
    
    local MainFrame = Instance.new("Frame")
    MainFrame.Parent = CshellHub; MainFrame.BackgroundColor3 = Color3.fromRGB(15, 15, 20); MainFrame.Position = UDim2.new(0.5, -250, 0.5, -175); MainFrame.Size = UDim2.new(0, 500, 0, 350)
    Instance.new("UICorner", MainFrame).CornerRadius = UDim.new(0, 15)
    Instance.new("UIStroke", MainFrame).Color = Color3.fromRGB(50, 120, 255)
    
    local Title = Instance.new("TextLabel")
    Title.Parent = MainFrame; Title.Text = "CSHELL HUB PREMIUM"; Title.Font = Enum.Font.GothamBold; Title.TextColor3 = Color3.fromRGB(255, 255, 255); Title.TextSize = 28; Title.Size = UDim2.new(1, 0, 0, 60); Title.BackgroundTransparency = 1
    MakeDraggable(Title, MainFrame)
    
    local ToggleBtn = Instance.new("TextButton")
    ToggleBtn.Parent = CshellHub; ToggleBtn.BackgroundColor3 = Color3.fromRGB(50, 120, 255); ToggleBtn.Position = UDim2.new(0, 50, 0.5, 0); ToggleBtn.Size = UDim2.new(0, 60, 0, 60); ToggleBtn.Text = "CS"; ToggleBtn.TextColor3 = Color3.fromRGB(255, 255, 255); ToggleBtn.Font = Enum.Font.GothamBold; ToggleBtn.TextSize = 25
    Instance.new("UICorner", ToggleBtn).CornerRadius = UDim.new(1, 0)
    MakeDraggable(ToggleBtn)
    ToggleBtn.MouseButton1Click:Connect(function() MainFrame.Visible = not MainFrame.Visible end)

    local FarmBtn = Instance.new("TextButton")
    FarmBtn.Parent = MainFrame; FarmBtn.Text = "AUTO FARM: OFF"; FarmBtn.BackgroundColor3 = Color3.fromRGB(40, 40, 50); FarmBtn.Position = UDim2.new(0.1, 0, 0.25, 0); FarmBtn.Size = UDim2.new(0.8, 0, 0, 60); FarmBtn.TextColor3 = Color3.fromRGB(255, 255, 255); FarmBtn.Font = Enum.Font.GothamBold; FarmBtn.TextSize = 24; Instance.new("UICorner", FarmBtn)
    
    FarmBtn.MouseButton1Click:Connect(function()
        _G.AutoFarm = not _G.AutoFarm
        FarmBtn.Text = "AUTO FARM: " .. (_G.AutoFarm and "ON" or "OFF")
        FarmBtn.BackgroundColor3 = _G.AutoFarm and Color3.fromRGB(50, 150, 50) or Color3.fromRGB(40, 40, 50)
    end)
end

-- [[ LOGIN UI ]] --
if CoreGui:FindFirstChild("CshellLogin") then CoreGui.CshellLogin:Destroy() end
local CshellLogin = Instance.new("ScreenGui"); CshellLogin.Name = "CshellLogin"; CshellLogin.Parent = CoreGui
local MainLogin = Instance.new("Frame")
MainLogin.Parent = CshellLogin; MainLogin.BackgroundColor3 = Color3.fromRGB(15, 15, 20); MainLogin.Position = UDim2.new(0.5, -200, 0.5, -150); MainLogin.Size = UDim2.new(0, 400, 0, 300)
Instance.new("UICorner", MainLogin).CornerRadius = UDim.new(0, 20)
local LoginTitle = Instance.new("TextLabel")
LoginTitle.Parent = MainLogin; LoginTitle.Text = "CSHELL LOGIN"; LoginTitle.Font = Enum.Font.GothamBold; LoginTitle.TextColor3 = Color3.fromRGB(255, 255, 255); LoginTitle.TextSize = 35; LoginTitle.Size = UDim2.new(1, 0, 0, 80); LoginTitle.BackgroundTransparency = 1
MakeDraggable(LoginTitle, MainLogin)
local KeyInput = Instance.new("TextBox")
KeyInput.Parent = MainLogin; KeyInput.PlaceholderText = "Enter Key..."; KeyInput.BackgroundColor3 = Color3.fromRGB(25, 25, 35); KeyInput.Position = UDim2.new(0.1, 0, 0.35, 0); KeyInput.Size = UDim2.new(0.8, 0, 0, 55); KeyInput.TextColor3 = Color3.fromRGB(255, 255, 255); KeyInput.TextSize = 22; Instance.new("UICorner", KeyInput)
local LoginBtn = Instance.new("TextButton")
LoginBtn.Parent = MainLogin; LoginBtn.Text = "LOGIN"; LoginBtn.BackgroundColor3 = Color3.fromRGB(50, 120, 255); LoginBtn.Position = UDim2.new(0.1, 0, 0.62, 0); LoginBtn.Size = UDim2.new(0.38, 0, 0, 55); LoginBtn.TextColor3 = Color3.fromRGB(255, 255, 255); LoginBtn.Font = Enum.Font.GothamBold; LoginBtn.TextSize = 20; Instance.new("UICorner", LoginBtn)
local GetKeyBtn = Instance.new("TextButton")
GetKeyBtn.Parent = MainLogin; GetKeyBtn.Text = "GET KEY"; GetKeyBtn.BackgroundColor3 = Color3.fromRGB(40, 40, 50); GetKeyBtn.Position = UDim2.new(0.52, 0, 0.62, 0); GetKeyBtn.Size = UDim2.new(0.38, 0, 0, 55); GetKeyBtn.TextColor3 = Color3.fromRGB(255, 255, 255); GetKeyBtn.Font = Enum.Font.GothamBold; GetKeyBtn.TextSize = 20; Instance.new("UICorner", GetKeyBtn)

LoginBtn.MouseButton1Click:Connect(function() CshellLogin:Destroy(); LoadMainHub() end)
GetKeyBtn.MouseButton1Click:Connect(function() setclipboard(Config.GetKey) end)
