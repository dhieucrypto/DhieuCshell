-- [[ CSHELL HUB PREMIUM - ULTIMATE LOADER ]] --
repeat wait() until game:IsLoaded()

local UserInputService = game:GetService("UserInputService")
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

-- [[ DRAGGABLE ]] --
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

-- [[ ULTIMATE SCRIPTS (LUARMOR & STABLE) ]] --
local function LaunchScript(name)
    print("Loading " .. name .. "...")
    if name == "W-Azure (Best)" then
        loadstring(game:HttpGet("https://api.luarmor.net/files/v3/loaders/3b2169cf533361b390637cf675847a2.lua"))()
    elseif name == "Thunder Z" then
        loadstring(game:HttpGet("https://raw.githubusercontent.com/ThunderZ-HUB/Main/main/Main.lua"))()
    elseif name == "Zaque Hub" then
        loadstring(game:HttpGet("https://raw.githubusercontent.com/MechaZaque/ZaqueHub/refs/heads/main/ZaqueHubLoader.lua"))()
    elseif name == "R3D Hub" then
        loadstring(game:HttpGet("https://raw.githubusercontent.com/Rizky-Ananda/Redz-Hub/main/Source.lua"))()
    end
end

-- [[ AUTH & UI ]] --
local function RequestAPI(url, body)
    local req = (syn and syn.request) or (http and http.request) or http_request or (fluxus and fluxus.request) or request
    local res = req({ Url = url, Method = "POST", Headers = {["Content-Type"]="application/json"}, Body = HttpService:JSONEncode(body) })
    return HttpService:JSONDecode(res.Body)
end

local function LoadSelectionUI()
    if CoreGui:FindFirstChild("CshellSelection") then CoreGui.CshellSelection:Destroy() end
    local CshellSelection = Instance.new("ScreenGui"); CshellSelection.Name = "CshellSelection"; CshellSelection.Parent = CoreGui
    local Main = Instance.new("Frame")
    Main.Parent = CshellSelection; Main.BackgroundColor3 = Color3.fromRGB(15, 15, 20); Main.Position = UDim2.new(0.5, -200, 0.5, -200); Main.Size = UDim2.new(0, 400, 0, 400)
    Instance.new("UICorner", Main).CornerRadius = UDim.new(0, 20); Instance.new("UIStroke", Main).Color = Color3.fromRGB(50, 120, 255)
    
    local T = Instance.new("TextLabel")
    T.Parent = Main; T.Text = "SELECT SCRIPT"; T.Font = Enum.Font.GothamBold; T.TextColor3 = Color3.fromRGB(255, 255, 255); T.TextSize = 30; T.Size = UDim2.new(1, 0, 0, 70); T.BackgroundTransparency = 1; MakeDraggable(T, Main)

    local function CreateBtn(name, pos)
        local B = Instance.new("TextButton")
        B.Parent = Main; B.Text = name; B.BackgroundColor3 = Color3.fromRGB(30, 30, 40); B.Position = UDim2.new(0.1, 0, 0, pos); B.Size = UDim2.new(0.8, 0, 0, 60); B.TextColor3 = Color3.fromRGB(255, 255, 255); B.Font = Enum.Font.GothamBold; B.TextSize = 20; Instance.new("UICorner", B)
        B.MouseButton1Click:Connect(function() CshellSelection:Destroy(); LaunchScript(name) end)
    end

    CreateBtn("W-Azure (Best)", 80)
    CreateBtn("Thunder Z", 160)
    CreateBtn("Zaque Hub", 240)
    CreateBtn("R3D Hub", 320)
end

local function LoginUI()
    if CoreGui:FindFirstChild("CshellLogin") then CoreGui.CshellLogin:Destroy() end
    local CshellLogin = Instance.new("ScreenGui"); CshellLogin.Name = "CshellLogin"; CshellLogin.Parent = CoreGui
    local Main = Instance.new("Frame")
    Main.Parent = CshellLogin; Main.BackgroundColor3 = Color3.fromRGB(15, 15, 20); Main.Position = UDim2.new(0.5, -200, 0.5, -150); Main.Size = UDim2.new(0, 400, 0, 300)
    Instance.new("UICorner", Main).CornerRadius = UDim.new(0, 20); Instance.new("UIStroke", Main).Color = Color3.fromRGB(50, 120, 255)
    
    local T = Instance.new("TextLabel")
    T.Parent = Main; T.Text = "CSHELL LOGIN"; T.Font = Enum.Font.GothamBold; T.TextColor3 = Color3.fromRGB(255, 255, 255); T.TextSize = 35; T.Size = UDim2.new(1, 0, 0, 80); T.BackgroundTransparency = 1; MakeDraggable(T, Main)
    local K = Instance.new("TextBox")
    K.Parent = Main; K.PlaceholderText = "Enter Key..."; K.BackgroundColor3 = Color3.fromRGB(25, 25, 35); K.Position = UDim2.new(0.1, 0, 0.35, 0); K.Size = UDim2.new(0.8, 0, 0, 60); K.TextColor3 = Color3.fromRGB(255, 255, 255); K.TextSize = 25; Instance.new("UICorner", K)
    local B1 = Instance.new("TextButton")
    B1.Parent = Main; B1.Text = "LOGIN"; B1.BackgroundColor3 = Color3.fromRGB(50, 120, 255); B1.Position = UDim2.new(0.1, 0, 0.65, 0); B1.Size = UDim2.new(0.38, 0, 0, 65); B1.TextColor3 = Color3.fromRGB(255, 255, 255); B1.Font = Enum.Font.GothamBold; B1.TextSize = 22; Instance.new("UICorner", B1)
    local B2 = Instance.new("TextButton")
    B2.Parent = Main; B2.Text = "GET KEY"; B2.BackgroundColor3 = Color3.fromRGB(40, 40, 50); B2.Position = UDim2.new(0.52, 0, 0.65, 0); B2.Size = UDim2.new(0.38, 0, 0, 65); B2.TextColor3 = Color3.fromRGB(255, 255, 255); B2.Font = Enum.Font.GothamBold; B2.TextSize = 22; Instance.new("UICorner", B2)
    local Status = Instance.new("TextLabel")
    Status.Parent = Main; Status.Text = "Waiting..."; Status.TextColor3 = Color3.fromRGB(180, 180, 180); Status.Position = UDim2.new(0, 0, 0.9, 0); Status.Size = UDim2.new(1, 0, 0, 25); Status.BackgroundTransparency = 1; Status.TextSize = 14

    local function Verify(key)
        Status.Text = "Verifying..."; Status.TextColor3 = Color3.fromRGB(255, 255, 255)
        local success, res = pcall(function()
            return RequestAPI(Config.ApiURL, {
                appId = Config.AppID,
                secret = Config.Secret,
                key = key,
                hwid = game:GetService("RbxAnalyticsService"):GetClientId()
            })
        end)
        if success and res and res.success then
            writefile(Config.SaveFile, key)
            CshellLogin:Destroy()
            LoadSelectionUI()
        else
            Status.Text = res and res.message or "Invalid Key!"; Status.TextColor3 = Color3.fromRGB(255, 50, 50)
        end
    end

    B1.MouseButton1Click:Connect(function() Verify(K.Text) end)
    B2.MouseButton1Click:Connect(function() setclipboard(Config.GetKey); Status.Text = "Link copied!" end)

    if isfile(Config.SaveFile) then
        local savedKey = readfile(Config.SaveFile)
        K.Text = savedKey
        spawn(function() Verify(savedKey) end)
    end
end

LoginUI()
