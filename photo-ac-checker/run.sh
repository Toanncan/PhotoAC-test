#!/bin/bash
cd "$(dirname "$0")"
node check-urls.js "$@"
echo ""
read -p "Nhấn Enter để thoát..."
