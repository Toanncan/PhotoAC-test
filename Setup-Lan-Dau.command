#!/bin/bash

# Navigate to script directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "================================================================"
echo "   ⚙️ PHOTO-AC AUTOMATION - CAI DAT MOI TRUONG LAN DAU (macOS)"
echo "================================================================"
echo ""

# 1. Kiem tra Node.js
echo "[1/4] Kiem tra Node.js..."
if ! command -v node &> /dev/null; then
    echo "[ERROR] May Mac cua ban chua co Node.js!"
    echo "Vui long vao https://nodejs.org/ va cai ban LTS nhe."
    echo ""
    read -p "Nhan Enter de thoat..."
    exit 1
fi
echo "[OK] Node.js da co san."

# 2. Cai dat npm packages
echo ""
echo "[2/4] Dang cai dat cac thu vien (npm install)..."
npm install

# 3. Cai dat Playwright Browsers
echo ""
echo "[3/4] Dang tai trinh duyet kiem thu (Chromium & Firefox)..."
npx playwright install chromium firefox

# 4. Kiem tra Java cho Allure Report
echo ""
echo "[4/4] Kiem tra Java Runtime cho Allure Report..."
if command -v java &> /dev/null; then
    echo "[OK] Java da co san tren may."
else
    if command -v brew &> /dev/null; then
        echo "Dang cai dat Java OpenJDK qua Homebrew..."
        brew install openjdk@17
    else
        echo "Hay cai dat Java tai: https://adoptium.net/temurin/releases/?version=17"
    fi
fi

echo ""
echo "================================================================"
echo "   🎉 CAI DAT HOAN TAT!"
echo "   Tu gio ban chi can click dup vao:"
echo "   👉 Run-Test-App.command de bat dau chay test."
echo "================================================================"
echo ""
read -p "Nhan Enter de hoan tat..."
