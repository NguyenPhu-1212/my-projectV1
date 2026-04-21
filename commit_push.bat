@echo off
set PATH=C:\Git\mingw64\bin;%PATH%
cd /d d:\wednhom\quan-ly-tai-chinh
git add -A
git commit -m "Update login form - remove password hint"
git push origin main
