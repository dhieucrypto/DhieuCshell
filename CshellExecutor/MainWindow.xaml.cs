using System;
using System.IO;
using System.IO.Pipes;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Windows;

namespace CshellExecutor
{
    public partial class MainWindow : Window
    {
        // Import các hàm hệ thống để Inject DLL
        [DllImport("kernel32.dll")]
        public static extern IntPtr OpenProcess(int dwDesiredAccess, bool bInheritHandle, int dwProcessId);

        [DllImport("kernel32.dll", CharSet = CharSet.Auto)]
        public static extern IntPtr GetModuleHandle(string lpModuleName);

        [DllImport("kernel32.dll", CharSet = CharSet.Ansi, ExactSpelling = true, SetLastError = true)]
        static extern IntPtr GetProcAddress(IntPtr hModule, string lpProcName);

        [DllImport("kernel32.dll", SetLastError = true, ExactSpelling = true)]
        static extern IntPtr VirtualAllocEx(IntPtr hProcess, IntPtr lpAddress, uint dwSize, uint flAllocationType, uint flProtect);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern bool WriteProcessMemory(IntPtr hProcess, IntPtr lpBaseAddress, byte[] lpBuffer, uint nSize, out UIntPtr lpNumberOfBytesWritten);

        [DllImport("kernel32.dll")]
        static extern IntPtr CreateRemoteThread(IntPtr hProcess, IntPtr lpThreadAttributes, uint dwStackSize, IntPtr lpStartAddress, IntPtr lpParameter, uint dwCreationFlags, IntPtr lpThreadId);

        public MainWindow()
        {
            InitializeComponent();
        }

        private void InjectBtn_Click(object sender, RoutedEventArgs e)
        {
            string dllPath = Path.GetFullPath("CshellCore.dll");
            Process[] processes = Process.GetProcessesByName("RobloxPlayerBeta");

            if (processes.Length == 0) {
                MessageBox.Show("Vui lòng mở Roblox trước!");
                return;
            }

            // Logic Inject cơ bản (Sử dụng LoadLibrary)
            IntPtr hProcess = OpenProcess(0x1F0FFF, false, processes[0].Id);
            IntPtr addr = VirtualAllocEx(hProcess, IntPtr.Zero, (uint)((dllPath.Length + 1) * Marshal.SizeOf(typeof(char))), 0x3000, 4);
            UIntPtr bytesWritten;
            WriteProcessMemory(hProcess, addr, System.Text.Encoding.Default.GetBytes(dllPath), (uint)((dllPath.Length + 1) * Marshal.SizeOf(typeof(char))), out bytesWritten);
            CreateRemoteThread(hProcess, IntPtr.Zero, 0, GetProcAddress(GetModuleHandle("kernel32.dll"), "LoadLibraryA"), addr, 0, IntPtr.Zero);
            
            MessageBox.Show("Đã gửi yêu cầu Inject!");
        }

        private void ExecBtn_Click(object sender, RoutedEventArgs e)
        {
            try {
                using (NamedPipeClientStream pipeClient = new NamedPipeClientStream(".", "CshellPipe", PipeDirection.Out))
                {
                    pipeClient.Connect(1000);
                    using (StreamWriter sw = new StreamWriter(pipeClient))
                    {
                        sw.Write(ScriptEditor.Text);
                        sw.Flush();
                    }
                }
            } catch {
                MessageBox.Show("Vui lòng nhấn INJECT trước khi chạy script!");
            }
        }
    }
}
