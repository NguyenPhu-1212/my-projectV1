# 💰 Ứng dụng Quản lý Tài Chính Cá Nhân

🎉 **Chúc mừng ngày 30/4 & 1/5!** - Ứng dụng web hiện đại để quản lý thu chi cá nhân với giao diện đẹp, an toàn và tính năng đầy đủ.

---

## 🔒 THÔNG TIN ĐĂNG NHẬP

**⚠️ BƯỚC ĐẦU TIÊN: BẠN PHẢI ĐĂNG NHẬP TRƯỚC KHI SỬ DỤNG**

- **Tài khoản**: `admin`
- **Mật khẩu**: `123456`

> ✅ Login là **bắt buộc** để bảo vệ dữ liệu của bạn
> ✅ Dữ liệu được lưu trữ an toàn trong trình duyệt (LocalStorage)

---

## ✨ TÍNH NĂNG CHÍNH

### 📊 Dashboard (Bảng Điều Khiển)
Màn hình chính hiển thị tổng quan toàn bộ tài chính của bạn:

**Thẻ Số Liệu Tổng Quan**:
- 💚 **Tổng Thu**: Tổng tiền bạn nhận được
- ❤️ **Tổng Chi**: Tổng tiền bạn đã chi
- 💙 **Số Dư**: Số tiền còn lại (Thu - Chi)
- 🟨 **Giao Dịch**: Tổng số giao dịch đã thêm

**Biểu Đồ và Dữ Liệu**:
- **Biểu Đồ Thu Chi**: Biểu đồ tròn so sánh tỷ lệ thu và chi
- **Biểu Đồ Xu Hướng**: Đồ thị đường chi tiết 30 ngày gần nhất
- **Giao Dịch Gần Đây**: Bảng hiển thị 5 giao dịch mới nhất

### 💳 Quản Lý Giao Dịch
Quản lý chi tiết tất cả giao dịch của bạn:

**📝 Thêm Giao Dịch Mới**:
1. Click nút **"➕ Thêm giao dịch"** (ở góc trên phải)
2. Chọn loại giao dịch: **Thu** (tiền vào) hoặc **Chi** (tiền ra)
3. Điền thông tin: Số tiền, Danh mục, Ngày, Ghi chú (tùy chọn)
4. Click **"Lưu"** để lưu giao dịch

**🔍 Lọc và Tìm Kiếm**:
- Dùng các ô lọc: Ngày, Tháng, Loại, Tìm kiếm
- Dữ liệu tự động cập nhật khi thay đổi lọc
- Click "Xóa bộ lọc" để xem lại tất cả

**✏️ Sửa Hoặc Xóa**:
- Bảng hiển thị tất cả giao dịch có nút **Sửa** ✏️ và **Xóa** 🗑️

### 📈 Báo Cáo
Xem phân tích chi tiết và xuất dữ liệu:

**📊 Biểu Đồ Báo Cáo**:
- **Thu chi theo danh mục**: Biểu đồ cột so sánh thu/chi từng danh mục
- **Thu chi theo tháng**: Đồ thị đường xu hướng hàng tháng

**💾 Xuất Dữ Liệu**:
- **📥 CSV**: Xuất sang Excel
- **📦 JSON**: Xuất dạng JSON (sao lưu)
- **📄 PDF**: Xuất dạng PDF (in hoặc lưu)

### 🎨 Giao Diện
- **📱 Responsive**: Hoạt động tốt trên mọi thiết bị
- **🌙 Dark Mode**: Click nút "🌙 Dark Mode" để chuyển chế độ tối
- **🎊 Giao diện lễ**: Trang đăng nhập có cờ Việt Nam chúc mừng ngày 30/4 & 1/5
- **⚡ Bootstrap 5**: Framework UI hiện đại
- **🎯 Font Awesome Icons**: Biểu tượng đẹp và trực quan

## 🚀 HƯỚNG DẪN SỬ DỤNG

### Bước 1: Chạy Ứng Dụng
**Cách 1: Mở trực tiếp (Đơn giản nhất)**
- Tìm file `index.html` và nhấp đúp để mở
- Hoặc kéo vào trình duyệt web

**Cách 2: Chạy server local**
```bash
# Python
python -m http.server 8000
# Rồi mở http://localhost:8000

# Hoặc Node.js
npx http-server
```

### Bước 2: Đăng Nhập
- Nhập **Tài khoản**: `admin`
- Nhập **Mật khẩu**: `123456`
- Click **"Đăng nhập"** 🔐

### Bước 3: Sử Dụng Ứng Dụng
**Dashboard**:
- Xem tổng thu, chi, số dư
- Xem biểu đồ thu chi
- Xem 5 giao dịch mới nhất

**Giao Dịch**:
- Click **"Thêm giao dịch"** để thêm mới
- Dùng **lọc** để tìm giao dịch
- Click **Sửa** ✏️ hoặc **Xóa** 🗑️

**Báo Cáo**:
- Xem biểu đồ phân tích
- Click **CSV / JSON / PDF** để xuất dữ liệu

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG

| Công Nghệ | Mục Đích |
|-----------|----------|
| **HTML5** | Cấu trúc trang web |
| **CSS3** | Định dạng giao diện + Responsive |
| **JavaScript (ES6+)** | Logic ứng dụng |
| **Bootstrap 5.3** | Framework UI hiện đại |
| **Chart.js** | Vẽ biểu đồ tương tác |
| **Font Awesome 6.4** | Icons đẹp |
| **jsPDF + autotable** | Xuất PDF |
| **LocalStorage** | Lưu dữ liệu trên trình duyệt |

## 📁 CẤU TRÚC DỰ ÁN

```
quan-ly-tai-chinh/
├── index.html          # Trang web chính
├── style.css           # CSS tùy chỉnh + giao diện lễ
├── script.js           # JavaScript logic
├── README.md           # Hướng dẫn này
└── .git/               # Git repository
```

## 💡 LƯU Ý QUAN TRỌNG

### 🔐 Bảo Mật
- ✅ Login là **bắt buộc** - phải đăng nhập trước khi vào
- ✅ Dữ liệu được lưu trong **LocalStorage** (bộ nhớ trình duyệt)
- ⚠️ **KHÔNG chia sẻ thông tin login** (admin / 123456)
- ⚠️ **Dữ liệu sẽ mất nếu xóa cookies** - hãy xuất backup định kỳ

### 💾 Sao Lưu Dữ Liệu
- Thường xuyên **xuất dữ liệu** (JSON hoặc PDF)
- Lưu file backup ở nơi an toàn
- Có thể **nhập lại dữ liệu từ file JSON** khi cần

### 🐛 Khắc Phục Sự Cố
| Vấn Đề | Cách Giải Quyết |
|--------|-----------------|
| Quên mật khẩu | Xóa cookies rồi reload (yêu cầu login lại) |
| Dữ liệu bị mất | Kiểm tra file JSON sao lưu |
| Giao diện lỗi | Nhấn F5 hoặc Ctrl+Shift+R (xóa cache) |
| Lỗi kỹ thuật | Nhấn F12 để xem DevTools → Console |

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề, hãy thử:
1. **Reload trang**: Nhấn F5 hoặc Ctrl+R
2. **Xóa cache**: Ctrl+Shift+R (Force reload)
3. **Thử trên trình duyệt khác**: Chrome, Firefox, Edge, v.v...
4. **Kiểm tra Console**: Nhấn F12 → Console (xem lỗi chi tiết)

---

## 🎯 TÍNH NĂNG NÂNG CAO (Có Thể Phát Triển Sau)

- [ ] Backend API (Node.js / Python)
- [ ] Database (MongoDB / PostgreSQL)
- [ ] Multi-user support
- [ ] Budget planning & alerts
- [ ] Recurring transactions
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Cloud backup

---

**Cảm ơn bạn đã sử dụng ứng dụng Quản lý Tài Chính Cá Nhân! 🎊🎉**

---

**Lưu ý**: Đây là phiên bản web, dữ liệu được lưu trữ an toàn trong trình duyệt (LocalStorage).