print("--- CSHELL DEBUG START ---")

local success, result = pcall(function()
    print("1. Fetching Main Script...")
    local code = game:HttpGet("https://raw.githubusercontent.com/dhieucrypto/DhieuCshell/main/CshellHUB_Final.lua")
    print("2. Code fetched, length: " .. #code)
    
    print("3. Loading string...")
    local func, err = loadstring(code)
    if not func then 
        print("!! Loadstring Error: " .. tostring(err))
        return 
    end
    
    print("4. Executing...")
    func()
    print("5. Execution finished!")
end)

if not success then
    print("!! Global Error: " .. tostring(result))
end

print("--- CSHELL DEBUG END ---")
