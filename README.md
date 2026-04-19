# Ứng dụng Quản lý Tài Chính Cá Nhân

Một ứng dụng web hiện đại để quản lý thu chi cá nhân với giao diện đẹp và tính năng đầy đủ.

## ✨ Tính năng

### 🏠 Dashboard
- **Thống kê tổng quan**: Tổng thu, tổng chi, số dư, số giao dịch
- **Biểu đồ tròn**: Hiển thị tỷ lệ thu/chi
- **Biểu đồ đường**: Xu hướng thu chi 30 ngày gần nhất
- **Giao dịch gần đây**: Danh sách 5 giao dịch mới nhất

### 💰 Quản lý Giao dịch
- **Thêm giao dịch**: Form modal với validation
- **Sửa/Xóa giao dịch**: Chức năng CRUD đầy đủ
- **Lọc dữ liệu**: Theo ngày, tháng, loại giao dịch
- **Tìm kiếm**: Tìm theo danh mục hoặc ghi chú
- **Bảng dữ liệu**: Hiển thị tất cả giao dịch với pagination

### 📊 Báo cáo
- **Báo cáo theo danh mục**: Biểu đồ cột so sánh thu/chi từng danh mục
- **Báo cáo theo tháng**: Biểu đồ đường xu hướng hàng tháng

### ⚙️ Cài đặt
- **Xuất dữ liệu**: CSV, JSON, PDF
- **Nhập dữ liệu**: Từ file JSON
- **Xóa tất cả**: Reset dữ liệu (có xác nhận)

### 🎨 Giao diện
- **Responsive**: Hoạt động tốt trên mọi thiết bị
- **Dark mode**: Chế độ tối/sáng
- **Bootstrap 5**: Framework UI hiện đại
- **Animations**: Hiệu ứng mượt mà
- **Icons**: Font Awesome icons

## 🚀 Cách sử dụng

### Đăng nhập
- Tài khoản: `admin`
- Mật khẩu: `123456`

### Thêm giao dịch
1. Chọn tab "Giao dịch"
2. Click "Thêm giao dịch"
3. Điền thông tin và lưu

### Lọc dữ liệu
1. Sử dụng các ô lọc ở trên bảng
2. Click "Áp dụng" để lọc
3. Click "Xóa lọc" để hiển thị tất cả

### Xuất dữ liệu
1. Chọn tab "Cài đặt"
2. Click nút xuất tương ứng

## 🛠️ Công nghệ sử dụng

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5
- **Charts**: Chart.js
- **Icons**: Font Awesome
- **PDF Export**: jsPDF
- **Storage**: LocalStorage (có thể nâng cấp lên database)

## 📁 Cấu trúc dự án

```
quan-ly-tai-chinh/
├── index.html          # File chính
├── style.css           # Styles tùy chỉnh
├── script.js           # Logic ứng dụng
└── README.md           # Tài liệu này
```

## 🔧 Cài đặt và chạy

1. **Clone repository** (nếu có):
   ```bash
   git clone https://github.com/your-username/quan-ly-tai-chinh.git
   cd quan-ly-tai-chinh
   ```

2. **Mở file**:
   - Mở `index.html` trong trình duyệt web

3. **Hoặc chạy server local**:
   ```bash
   # Sử dụng Python
   python -m http.server 8000

   # Hoặc Node.js
   npx http-server

   # Sau đó mở http://localhost:8000
   ```

## 🌟 Tính năng nâng cao

- **Authentication**: Hệ thống đăng nhập cơ bản
- **Data Persistence**: Lưu trữ local (có thể nâng cấp lên cloud)
- **Export/Import**: Hỗ trợ nhiều định dạng
- **Responsive Design**: Tương thích mobile
- **Modern UI/UX**: Thiết kế theo chuẩn hiện đại

## 📈 Roadmap

- [ ] Backend API với Node.js/Express
- [ ] Database (MongoDB/PostgreSQL)
- [ ] Authentication JWT
- [ ] Multi-user support
- [ ] Budget planning
- [ ] Recurring transactions
- [ ] Email notifications
- [ ] Mobile app (React Native)

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

## 📄 License

Dự án này sử dụng license MIT.

---

**Lưu ý**: Đây là phiên bản demo. Dữ liệu được lưu trong localStorage của trình duyệt.