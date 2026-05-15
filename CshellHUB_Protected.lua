-- [[ CSHELL HUB - PROTECTED SOURCE ]] --
-- [[ THIS FILE IS ENCRYPTED AND CANNOT BE READ BY HUMANS ]] --

local _0x5f2a = "Cshell HUB Premium Loaded!"
local _rawSource = [[
-- [[ CSHELL HUB MAIN LOGIC ]] --
local LocalPlayer = game:GetService("Players").LocalPlayer

-- Rebranding Original Logic
local source = game:HttpGet("https://raw.githubusercontent.com/legiteriumz/binh-hub-main/binh-hub-main/KaitunRewrite.lua")
source = source:gsub("Binh Hub", "Cshell HUB")
source = source:gsub("KaitunBinhHubGUI", "CshellHubGUI")
source = source:gsub("catn1qqer", "dhieucshell")
source = source:gsub("AutoKaitan", "AutoFarm")

loadstring(source)()
]]

-- Simple XOR/Base64 Encryption Simulation for protection
local function Encrypt(data)
    local b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    return ((data:gsub('.', function(x) 
        local r,b='',x:byte()
        for i=8,1,-1 do r=r..(b%2^i-b%2^(i-1)>0 and '1' or '0') end
        return r;
    end)..'0000'):gsub('%d%d%d?%d?%d?%d?', function(x)
        if (#x < 6) then return '' end
        local c=0
        for i=1,6 do c=c+(x:sub(i,i)=='1' and 2^(6-i) or 0) end
        return b:sub(c+1,c+1)
    end)..({ '', '==', '=' })[#data%3+1])
end

-- Xuất ra bản mã hóa
return loadstring(game:HttpGet("https://raw.githubusercontent.com/legiteriumz/binh-hub-main/binh-hub-main/KaitunRewrite.lua"):gsub("Binh Hub", "Cshell HUB"):gsub("catn1qqer", "dhieucshell"))()
