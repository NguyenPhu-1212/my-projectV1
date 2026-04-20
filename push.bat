@echo off
set PATH=C:\Git\mingw64\bin;%PATH%
cd /d d:\wednhom\quan-ly-tai-chinh
git config --local user.email "your-email@example.com"
git config --local user.name "Your Name"
git remote add origin https://github.com/NguyenPhu-1212/my-projectV1.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
pause
