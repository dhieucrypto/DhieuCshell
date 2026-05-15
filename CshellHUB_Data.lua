-- [[ CSHELL HUB - REBRANDED DATA ]] --
local source = game:HttpGet("https://raw.githubusercontent.com/legiteriumz/binh-hub-main/binh-hub-main/KaitunRewrite.lua")
source = source:gsub("Binh Hub", "Cshell HUB")
source = source:gsub("KaitunBinhHubGUI", "CshellHubGUI")
source = source:gsub("catn1qqer", "dhieucshell")
source = source:gsub("AutoKaitan", "AutoFarm")

loadstring(source)()
