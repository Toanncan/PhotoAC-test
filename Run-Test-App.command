#!/bin/bash

# Navigate to script directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "================================================================"
echo "   🚀 PHOTO-AC AUTOMATION TEST PORTAL (macOS / iMac LAUNCHER)"
echo "================================================================"
echo ""

# 1. Kiem tra Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] May Mac cua ban chua cai dat Node.js!"
    echo "Vui long cai dat tai https://nodejs.org/ hoac chay: brew install node"
    echo ""
    read -p "Nhan Enter de thoat..."
    exit 1
fi

# 2. Kiem tra dependencies node_modules
if [ ! -d "node_modules" ]; then
    echo "[INFO] Dang cai dat dependencies lan dau tien (npm install)..."
    npm install
    echo "[INFO] Cai dat Playwright Browsers..."
    npx playwright install chromium
fi

# 3. Kiem tra Java Runtime cho Allure Report
if ! command -v java &> /dev/null; then
    echo "[CANH BAO] May Mac chua co Java Runtime (JRE/JDK). Allure Report can Java."
    if command -v brew &> /dev/null; then
        echo "Dang thu tu dong cai dat Java qua Homebrew (brew install openjdk@17)..."
        brew install openjdk@17
    else
        echo "De xem duoc Allure Report, ban co the tai Java tai:"
        echo "https://adoptium.net/temurin/releases/?version=17"
    fi
    echo ""
fi

# 4. Khoi dong Test Portal Server
echo "[INFO] Dang khoi dong Test Portal tai http://localhost:4000 ..."
echo "Trinh duyet se tu dong mo len trong giay lat."
echo ""
echo "(De dung server, hay dong cua so terminal nay hoac nhan Ctrl + C)"
echo ""

node dashboard/server.js
