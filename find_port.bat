@echo off
echo Set objShell = CreateObject("Shell.Application") > "%temp%\runas.vbs"
echo objShell.ShellExecute "cmd.exe", "/c wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline > ""%~dp0client-port.txt""", "", "runas", 1 >> "%temp%\runas.vbs"
cscript "%temp%\runas.vbs"
del "%temp%\runas.vbs"