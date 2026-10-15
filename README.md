# VietMind Project

Dự án gồm **Backend (BE)** và **Frontend (FE)** được tách riêng biệt trong cùng 1 workspace, mỗi bên sở hữu `package.json` và `node_modules` riêng biệt.

---

## Cấu trúc thư mục

```text
VietMind/
├── be/                          # Backend (Express 5 + TypeScript + MongoDB Atlas)
│   ├── src/                     # Mã nguồn Backend theo mô hình MVC
│   │   ├── config/              # Kết nối Database (MongoDB Atlas)
│   │   ├── controllers/         # Điều khiển API
│   │   ├── dtos/                # Định dạng dữ liệu trả về client
│   │   ├── middlewares/         # Middleware bắt lỗi, 404, CORS
│   │   ├── models/              # Mongoose Schema
│   │   ├── repository/          # Truy vấn dữ liệu MongoDB
│   │   ├── routes/              # Express Router (/api/employees)
│   │   ├── services/            # Tầng nghiệp vụ
│   │   ├── types/               # Kiểu dữ liệu TypeScript
│   │   ├── utils/               # Tiện ích phản hồi JSON
│   │   ├── app.ts               # Khởi tạo ứng dụng Express
│   │   └── server.ts            # Server entrypoint
│   ├── .env                     # Biến môi trường Backend (MongoDB URI, PORT)
│   ├── node_modules/            # Thư viện riêng của Backend
│   ├── package.json             # Cấu hình scripts & dependencies của BE
│   └── tsconfig.json            # Cấu hình TypeScript BE
│
├── fe/                          # Frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── api/                 # Gọi API backend (/api/employees)
│   │   │   └── userApi.ts
│   │   ├── components/          # Giao diện thành phần tái sử dụng
│   │   │   ├── UserTable.ts     # Bảng danh sách người dùng (đã ẩn ID)
│   │   │   └── StatusViews.ts   # Giao diện Loading, Error, Empty
│   │   ├── styles/              # CSS stylesheet
│   │   │   └── main.css         # Phong cách thiết kế hiện đại, responsive
│   │   ├── types/               # Định nghĩa TypeScript interface
│   │   │   └── user.ts          # Kiểu User và hàm parse dữ liệu an toàn
│   │   ├── utils/               # Hàm tiện ích dùng chung
│   │   │   ├── format.ts        # Xử lý chuỗi, chữ viết tắt avatar, bảng màu
│   │   │   └── icons.ts         # Icon SVG tối giản
│   │   └── main.ts              # Entrypoint khởi tạo app & quản lý state
│   ├── node_modules/            # Thư viện riêng của Frontend
│   ├── package.json             # Cấu hình scripts & dependencies của FE
│   └── vite.config.ts           # Cấu hình Vite & proxy /api sang BE (port 3000)
│
└── package.json                 # Cấu hình root hỗ trợ lệnh gõ nhanh
```

---

## Hướng dẫn chạy

### 1. Chạy Backend (Port 3000)
```sh
cd be
npm run dev
```

### 2. Chạy Frontend (Port 5173)
```sh
cd fe
npm run dev
```

---

## Hoặc chạy nhanh từ thư mục ngoài
```sh
npm run dev:be     # Chạy BE
npm run dev:fe     # Chạy FE
npm run typecheck  # Kiểm tra kiểu TypeScript cho cả 2 bên
```
