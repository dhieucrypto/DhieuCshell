-- [[ CSHELL HUB PREMIUM - OFFICIAL STANDALONE ]] --
repeat wait() until game:IsLoaded()
print("--- CSHELL STARTING ---")

local UserInputService = game:GetService("UserInputService")
local TweenService = game:GetService("TweenService")
local HttpService = game:GetService("HttpService")
local CoreGui = game:GetService("CoreGui")
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

-- [[ SETTINGS ]] --
_G.AutoFarm = false
_G.BringMob = true
_G.FastAttack = true

-- [[ DATA SEA 1 ]] --
local Sea1Quests = {
    {Level = 0, Name = "Bandit", Quest = "BanditQuest1", Monster = "Bandit", QPos = CFrame.new(1060, 16, 1547), MPos = CFrame.new(1145, 17, 1634)},
    {Level = 10, Name = "Monkey", Quest = "JungleQuest", Monster = "Monkey", QPos = CFrame.new(-1601, 37, 153), MPos = CFrame.new(-1623, 37, 153)},
    {Level = 15, Name = "Gorilla", Quest = "JungleQuest", Monster = "Gorilla", QPos = CFrame.new(-1601, 37, 153), MPos = CFrame.new(-1237, 7, -493)},
    {Level = 30, Name = "Pirate", Quest = "PirateVillageQuest", Monster = "Pirate", QPos = CFrame.new(-1139, 4, 3826), MPos = CFrame.new(-1182, 4, 3901)},
    {Level = 45, Name = "Brute", Quest = "PirateVillageQuest", Monster = "Brute", QPos = CFrame.new(-1139, 4, 3826), MPos = CFrame.new(-1134, 14, 4310)},
    {Level = 60, Name = "Desert Bandit", Quest = "DesertQuest", Monster = "Desert Bandit", QPos = CFrame.new(896, 6, 4389), MPos = CFrame.new(996, 6, 4423)},
    {Level = 75, Name = "Desert Officer", Quest = "DesertQuest", Monster = "Desert Officer", QPos = CFrame.new(896, 6, 4389), MPos = CFrame.new(1566, 6, 4390)},
    {Level = 90, Name = "Snow Bandit", Quest = "SnowQuest", Monster = "Snow Bandit", QPos = CFrame.new(1385, 7, -1298), MPos = CFrame.new(1281, 7, -1318)},
    {Level = 120, Name = "Chief Petty Officer", Quest = "MarineQuest", Monster = "Chief Petty Officer", QPos = CFrame.new(-4842, 22, 4366), MPos = CFrame.new(-4840, 22, 4330)}
}

-- [[ DRAGGABLE SYSTEM ]] --
local function MakeDraggable(UI)
    local dragging, dragInput, dragStart, startPos
    UI.InputBegan:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch then
            dragging = true; dragStart = input.Position; startPos = UI.Position
            input.Changed:Connect(function() if input.UserInputState == Enum.UserInputState.End then dragging = false end end)
        end
    end)
    UI.InputChanged:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseMovement or input.UserInputType == Enum.UserInputType.Touch then dragInput = input end
    end)
    UserInputService.InputChanged:Connect(function(input)
        if input == dragInput and dragging then
            local delta = input.Position - dragStart
            UI.Position = UDim2.new(startPos.X.Scale, startPos.X.Offset + delta.X, startPos.Y.Scale, startPos.Y.Offset + delta.Y)
        end
    end)
end

-- [[ AUTO FARM LOGIC ]] --
function EquipWeapon()
    pcall(function()
        for _, v in pairs(LocalPlayer.Backpack:GetChildren()) do
            if v:IsA("Tool") and (v.ToolTip == "Melee" or v.ToolTip == "Sword") then
                LocalPlayer.Character.Humanoid:EquipTool(v)
            end
        end
    end)
end

spawn(function()
    while wait() do
        if _G.AutoFarm then
            pcall(function()
                local level = LocalPlayer.Data.Level.Value
                local q = Sea1Quests[1]
                for _, quest in ipairs(Sea1Quests) do if level >= quest.Level then q = quest end end
                
                if not LocalPlayer.PlayerGui.Main.Quest.Visible then
                    LocalPlayer.Character.HumanoidRootPart.CFrame = q.QPos
                    game:GetService("ReplicatedStorage").Remotes.CommF_:InvokeServer("StartQuest", q.Quest, 1)
                else
                    local target = nil
                    for _, v in pairs(game.Workspace.Enemies:GetChildren()) do
                        if v.Name == q.Monster and v:FindFirstChild("Humanoid") and v.Humanoid.Health > 0 then
                            target = v
                            if _G.BringMob then v.HumanoidRootPart.CFrame = LocalPlayer.Character.HumanoidRootPart.CFrame * CFrame.new(0, 0, -5); v.HumanoidRootPart.CanCollide = false end
                        end
                    end
                    if target then
                        EquipWeapon()
                        LocalPlayer.Character.HumanoidRootPart.CFrame = target.HumanoidRootPart.CFrame * CFrame.new(0, 7, 0)
                        game:GetService("VirtualUser"):CaptureController()
                        game:GetService("VirtualUser"):Button1Down(Vector2.new(1280, 672))
                    else
                        LocalPlayer.Character.HumanoidRootPart.CFrame = q.MPos
                    end
                end
            end)
        end
    end
end)

-- [[ UI SYSTEM ]] --
local function LoadMainHub()
    if CoreGui:FindFirstChild("CshellHub") then CoreGui.CshellHub:Destroy() end
    local CshellHub = Instance.new("ScreenGui"); CshellHub.Name = "CshellHub"; CshellHub.Parent = CoreGui
    
    local MainFrame = Instance.new("Frame")
    MainFrame.Parent = CshellHub; MainFrame.BackgroundColor3 = Color3.fromRGB(15, 15, 20); MainFrame.Position = UDim2.new(0.5, -250, 0.5, -175); MainFrame.Size = UDim2.new(0, 500, 0, 350)
    Instance.new("UICorner", MainFrame).CornerRadius = UDim.new(0, 15); Instance.new("UIStroke", MainFrame).Color = Color3.fromRGB(50, 120, 255)
    MakeDraggable(MainFrame)

    local Title = Instance.new("TextLabel")
    Title.Parent = MainFrame; Title.Text = "CSHELL HUB PREMIUM"; Title.Font = Enum.Font.GothamBold; Title.TextColor3 = Color3.fromRGB(255, 255, 255); Title.TextSize = 28; Title.Size = UDim2.new(1, 0, 0, 60); Title.BackgroundTransparency = 1

    local Toggle = Instance.new("TextButton")
    Toggle.Parent = CshellHub; Toggle.Text = "CS"; Toggle.Size = UDim2.new(0, 70, 0, 70); Toggle.Position = UDim2.new(0, 20, 0.5, 0); Toggle.BackgroundColor3 = Color3.fromRGB(50, 120, 255); Toggle.TextColor3 = Color3.fromRGB(255, 255, 255); Toggle.Font = Enum.Font.GothamBold; Toggle.TextSize = 28
    Instance.new("UICorner", Toggle).CornerRadius = UDim.new(1, 0); MakeDraggable(Toggle)
    Toggle.MouseButton1Click:Connect(function() MainFrame.Visible = not MainFrame.Visible end)

    local FarmBtn = Instance.new("TextButton")
    FarmBtn.Parent = MainFrame; FarmBtn.Text = "AUTO FARM: OFF"; FarmBtn.BackgroundColor3 = Color3.fromRGB(40, 40, 50); FarmBtn.Position = UDim2.new(0.1, 0, 0.3, 0); FarmBtn.Size = UDim2.new(0.8, 0, 0, 80); FarmBtn.TextColor3 = Color3.fromRGB(255, 255, 255); FarmBtn.Font = Enum.Font.GothamBold; FarmBtn.TextSize = 26; Instance.new("UICorner", FarmBtn)
    FarmBtn.MouseButton1Click:Connect(function()
        _G.AutoFarm = not _G.AutoFarm
        FarmBtn.Text = "AUTO FARM: " .. (_G.AutoFarm and "ON" or "OFF")
        FarmBtn.BackgroundColor3 = _G.AutoFarm and Color3.fromRGB(50, 150, 50) or Color3.fromRGB(40, 40, 50)
    end)
end

local function LoginUI()
    if CoreGui:FindFirstChild("CshellLogin") then CoreGui.CshellLogin:Destroy() end
    local CshellLogin = Instance.new("ScreenGui"); CshellLogin.Name = "CshellLogin"; CshellLogin.Parent = CoreGui
    local Main = Instance.new("Frame")
    Main.Parent = CshellLogin; Main.BackgroundColor3 = Color3.fromRGB(15, 15, 20); Main.Position = UDim2.new(0.5, -200, 0.5, -150); Main.Size = UDim2.new(0, 400, 0, 300)
    Instance.new("UICorner", Main).CornerRadius = UDim.new(0, 20); MakeDraggable(Main)
    
    local T = Instance.new("TextLabel")
    T.Parent = Main; T.Text = "CSHELL LOGIN"; T.Font = Enum.Font.GothamBold; T.TextColor3 = Color3.fromRGB(255, 255, 255); T.TextSize = 35; T.Size = UDim2.new(1, 0, 0, 80); T.BackgroundTransparency = 1
    
    local K = Instance.new("TextBox")
    K.Parent = Main; K.PlaceholderText = "Enter Key..."; K.BackgroundColor3 = Color3.fromRGB(25, 25, 35); K.Position = UDim2.new(0.1, 0, 0.35, 0); K.Size = UDim2.new(0.8, 0, 0, 60); K.TextColor3 = Color3.fromRGB(255, 255, 255); K.TextSize = 25; Instance.new("UICorner", K)
    
    local B1 = Instance.new("TextButton")
    B1.Parent = Main; B1.Text = "LOGIN"; B1.BackgroundColor3 = Color3.fromRGB(50, 120, 255); B1.Position = UDim2.new(0.1, 0, 0.65, 0); B1.Size = UDim2.new(0.38, 0, 0, 65); B1.TextColor3 = Color3.fromRGB(255, 255, 255); B1.Font = Enum.Font.GothamBold; B1.TextSize = 22; Instance.new("UICorner", B1)
    
    local B2 = Instance.new("TextButton")
    B2.Parent = Main; B2.Text = "GET KEY"; B2.BackgroundColor3 = Color3.fromRGB(40, 40, 50); B2.Position = UDim2.new(0.52, 0, 0.65, 0); B2.Size = UDim2.new(0.38, 0, 0, 65); B2.TextColor3 = Color3.fromRGB(255, 255, 255); B2.Font = Enum.Font.GothamBold; B2.TextSize = 22; Instance.new("UICorner", B2)
    
    B1.MouseButton1Click:Connect(function() CshellLogin:Destroy(); LoadMainHub() end)
    B2.MouseButton1Click:Connect(function() setclipboard("https://cshellvn.vercel.app/getkey") end)
end

LoginUI()
print("--- CSHELL READY ---")
