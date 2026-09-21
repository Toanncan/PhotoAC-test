#!/bin/bash

# Navigate to script directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "================================================================"
echo "   🔄 PHOTO-AC AUTOMATION - DONG BO TESTCASE MOI NHAT (macOS)"
echo "================================================================"
echo ""

if ! command -v git &> /dev/null; then
    echo "[CANH BAO] Khong tim thay Git. Hay lien he Automation Lead de nhan ban ZIP moi nhat nhe!"
    echo ""
    read -p "Nhan Enter de thoat..."
    exit 1
fi

echo "[1/2] Dang tai ve cac testcase va kich ban moi nhat tu Github..."
git pull
if [ $? -ne 0 ]; then
    echo ""
    echo "[LOI] Khong the dong bo tu dong. Vui long kiem tra ket noi mang."
    echo ""
    read -p "Nhan Enter de thoat..."
    exit 1
fi

echo ""
echo "[2/2] Kiem tra thu vien moi..."
npm install --no-audit --no-fund

echo ""
echo "================================================================"
echo "   ✅ HOAN TAT! TOAN BO TESTCASE MOI DA SAN SANG."
echo "   Bay gio ban co the mo file 'Run-Test-App.command' de chay test!"
echo "================================================================"
echo ""
read -p "Nhan Enter de hoan tat..."
