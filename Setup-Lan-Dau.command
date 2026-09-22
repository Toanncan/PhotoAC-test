#!/bin/bash

# Navigate to script directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

# Cap quyen thuc thi cho tat ca cac file .command tren macOS
chmod +x *.command 2>/dev/null || true

echo "================================================================"
echo "   ⚙️ PHOTO-AC AUTOMATION - CAI DAT MOI TRUONG LAN DAU (macOS)"
echo "================================================================"
echo ""

# 1. Kiem tra Node.js
echo "[1/4] Kiem tra Node.js..."
if ! command -v node &> /dev/null; then
    echo "[ERROR] May Mac cua ban chua co Node.js!"
    echo "Vui long vao https://nodejs.org/ va cai dat ban LTS nhe."
    if command -v brew &> /dev/null; then
        echo "Hoac mo Terminal va chay lenh: brew install node"
    fi
    echo ""
    read -p "Nhan Enter de thoat..."
    exit 1
fi
echo "[OK] Node.js da duoc cai dat: $(node -v)"

# 2. Cai dat npm packages
echo ""
echo "[2/4] Dang cai dat cac goi thu vien can thiet (npm install)..."
npm install
if [ $? -ne 0 ]; then
    echo "[CANH BAO] npm install co loi xay ra. Vui long kiem tra ket noi internet."
fi

# 3. Cai dat Playwright Browsers
echo ""
echo "[3/4] Dang tai trinh duyet kiem thu (Chromium & Firefox)..."
npx playwright install chromium firefox
if [ $? -ne 0 ]; then
    echo "[CANH BAO] Cai dat trinh duyet gap loi. Ban co the thu chay lai sau."
fi

# 4. Kiem tra Java cho Allure Report
echo ""
echo "[4/4] Kiem tra Java Runtime cho Allure Report..."
if command -v java &> /dev/null; then
    echo "[OK] Java da co san tren may: $(java -version 2>&1 | head -n 1)"
else
    echo "[INFO] May Mac chua co Java Runtime (can thiet de tao Allure Report)."
    if command -v brew &> /dev/null; then
        echo "Dang thu tu dong cai dat Java OpenJDK 17 qua Homebrew..."
        brew install openjdk@17
        if [ $? -eq 0 ]; then
            echo "[OK] Da cai dat Java thanh cong!"
        else
            echo "[LUU Y] Khong the tu dong cai Java qua brew."
            echo "Hay tai file cai dat Java tai: https://adoptium.net/temurin/releases/?version=17"
        fi
    else
        echo "[LUU Y] May chua co Java. Hay tai file cai dat Java tai:"
        echo "https://adoptium.net/temurin/releases/?version=17"
    fi
fi

# Dam bao quyen thuc thi cho tat ca launcher tren macOS
chmod +x Run-Test-App.command Update-Tests.command Setup-Lan-Dau.command 2>/dev/null || true

echo ""
echo "================================================================"
echo "   🎉 CAI DAT HOAN TAT!"
echo "   Tu gio ban chi can click dup vao:"
echo "   👉 Run-Test-App.command de bat dau chay test."
echo "================================================================"
echo ""
read -p "Nhan Enter de hoan tat..."
