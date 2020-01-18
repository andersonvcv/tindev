echo "running all processes"

start PowerShell "-NoExit cd .\backend\; .\run.ps1"
start PowerShell "-NoExit cd .\web\; .\run.ps1"
start PowerShell "-NoExit cd .\mobile\; .\run.ps1"