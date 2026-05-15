import os

def merge():
    with open('KaitunRewrite.lua', 'r', encoding='utf-8') as f:
        kaitun = f.read()
    
    # 1. Rebranding (Thay từ chuỗi dài nhất trước để tránh lỗi)
    kaitun = kaitun.replace('Binh Hub Kaitun', 'CSHELL HUB PREMIUM')
    kaitun = kaitun.replace('Binh Hub', 'Cshell HUB')
    kaitun = kaitun.replace('catn1qqer', 'dhieucshell')
    kaitun = kaitun.replace('KaitunBinhHubGUI', 'CshellHubGUI')
    
    # 2. Fix lỗi dòng 758 (Xóa hẳn cái lệnh gây lỗi đi cho nhẹ nợ)
    kaitun = kaitun.replace('settings().Rendering.QualityLevel = "Level01"', '-- Removed settings error')
    
    # 3. Phóng to GUI (Làm cho nó to hẳn ra)
    kaitun = kaitun.replace('Size = UDim2.new(0, 1033, 0, 583)', 'Size = UDim2.new(0, 1300, 0, 800)')
    kaitun = kaitun.replace('Position = UDim2.new(0.499266863, -516, 0.498697907, -291)', 'Position = UDim2.new(0.5, -650, 0.5, -400)')
    
    loader_prefix = """-- [[ CSHELL HUB STANDALONE V2 ]] --
print("CSHELL HUB: Loading V2...")
"""
    
    with open('CshellHUB_A_Z.lua', 'w', encoding='utf-8') as f:
        f.write(loader_prefix + kaitun)

if __name__ == '__main__':
    merge()
