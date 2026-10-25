#!/bin/bash
cd "$(dirname "$0")"

echo "================================================================"
echo "      CAI DAT MOI TRUONG CHO VIDEO-AC STATUS CHECKER            "
echo "================================================================"
echo ""

if ! command -v node &> /dev/null; then
    echo "[ERROR] May cua ban chua cai dat Node.js!"
    echo "Vui long cai dat Node.js tu: https://nodejs.org/ (Chon ban LTS)"
    exit 1
fi

echo "[1/2] Dang cai dat thu vien Playwright..."
npm install

echo ""
echo "[2/2] Dang kiem tra va tai trinh duyet Chromium..."
npx playwright install chromium

echo ""
echo "================================================================"
echo "[THANH CONG] Cai dat hoan tat! Chay ./run.sh de su dung."
echo "================================================================"
