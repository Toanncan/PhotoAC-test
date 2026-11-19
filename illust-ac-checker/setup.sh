#!/bin/bash
cd "$(dirname "$0")"

echo "================================================================"
echo "      CAI DAT MOI TRUONG CHO ILLUST-AC STATUS CHECKER           "
echo "================================================================"
echo ""

if ! command -v node > /dev/null 2>&1; then
    echo "[ERROR] Máy của bạn chưa cài đặt Node.js!"
    echo "Vui lòng cài đặt Node.js từ: https://nodejs.org/ (Chọn bản LTS)"
    exit 1
fi

echo "[1/2] Đang cài đặt thư viện Playwright..."
npm install

echo ""
echo "[2/2] Đang kiểm tra và tải trình duyệt Chromium..."
npx playwright install chromium

echo ""
echo "================================================================"
echo "[THÀNH CÔNG] Cài đặt hoàn tất! Chạy ./run.command hoặc ./run.sh để sử dụng."
echo "================================================================"
