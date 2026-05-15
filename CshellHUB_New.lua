-- [[ CSHELL HUB LITE - OFFICIAL VERSION ]] --
local OrionLib = loadstring(game:HttpGet(('https://raw.githubusercontent.com/shlexware/Orion/main/source')))()
local Window = OrionLib:MakeWindow({Name = "Cshell HUB Lite", HidePremium = true, SaveConfig = true, ConfigFolder = "CshellHUB"})

-- [[ SETTINGS ]] --
getgenv().Config = {
    AutoFarm = false,
    FastAttack = true,
    AutoStats = false,
    SelectStat = "Melee"
}

-- [[ DATA ]] --
local Quests = {
    ["First Sea"] = {
        {Level = 0, Name = "Bandit", QuestName = "BanditQuest1", MonsterName = "Bandit"},
        {Level = 10, Name = "Monkey", QuestName = "JungleQuest", MonsterName = "Monkey"},
        -- Sẽ cập nhật thêm đầy đủ các đảo
    }
}

-- [[ CORE FUNCTIONS ]] --
function GetQuest()
    local level = game.Players.LocalPlayer.Data.Level.Value
    -- Logic tìm quest phù hợp level
    return "BanditQuest1", "Bandit", CFrame.new(1060, 16, 1547) -- Ví dụ đảo Bandit
end

function EquipWeapon()
    for i,v in pairs(game.Players.LocalPlayer.Backpack:GetChildren()) do
        if v:IsA("Tool") and v.ToolTip == "Melee" then
            game.Players.LocalPlayer.Character.Humanoid:EquipTool(v)
        end
    end
end

-- [[ AUTO FARM LOOP ]] --
spawn(function()
    while wait() do
        if getgenv().Config.AutoFarm then
            pcall(function()
                local quest, monster, pos = GetQuest()
                -- Nếu chưa có nhiệm vụ thì đi nhận
                if not game:GetService("Players").LocalPlayer.PlayerGui.Main.Quest.Visible then
                    game:GetService("TweenService"):Create(game.Players.LocalPlayer.Character.HumanoidRootPart, TweenInfo.new(1), {CFrame = pos}):Play()
                    -- Gọi Remote nhận nhiệm vụ
                else
                    -- Đi đánh quái
                    local target = game:GetService("Workspace").Enemies:FindFirstChild(monster)
                    if target and target:FindFirstChild("HumanoidRootPart") then
                        EquipWeapon()
                        game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = target.HumanoidRootPart.CFrame * CFrame.new(0, 5, 0)
                        -- Click đánh
                        game:GetService("VirtualUser"):CaptureController()
                        game:GetService("VirtualUser"):Button1Down(Vector2.new(1280, 672))
                    end
                end
            end)
        end
    end
end)

-- [[ UI TABS ]] --
local MainTab = Window:MakeTab({Name = "Auto Farm", Icon = "rbxassetid://4483345998"})
MainTab:AddToggle({
	Name = "Auto Farm Level (BETA)",
	Default = false,
	Callback = function(Value) getgenv().Config.AutoFarm = Value end    
})

local StatsTab = Window:MakeTab({Name = "Stats", Icon = "rbxassetid://4483345998"})
StatsTab:AddToggle({
	Name = "Auto Stats (Melee)",
	Default = false,
	Callback = function(Value) getgenv().Config.AutoStats = Value end    
})

OrionLib:Init()
