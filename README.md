# API danh sach nhan vien

API Express 5 + TypeScript theo MVC, dung Node.js 22+ va MongoDB Atlas.
`GET /api/employees` tra toan bo danh sach nhan vien.

## Cau truc

```text
src/
  app.ts                              Khoi tao ung dung va gan middleware
  server.ts                           Khoi dong may chu HTTP
  config/database.ts                  Ket noi MongoDB va khoi tao collection
  routes/employeeRoutes.ts             Khai bao duong dan bang Express Router
  controllers/employeeController.ts    Nhan yeu cau, goi service, tra ket qua
  services/employeeService.ts          Dieu phoi lay danh sach nhan vien
  repository/employeeRepository.ts     Truy cap du lieu
  models/employeeModel.ts              Model nhan vien va Mongoose Schema
  dtos/employeeResponseDto.ts          Chon 6 truong cua model de tra ve API
  views/employeeView.ts                Dinh dang danh sach thanh JSON
  middlewares/errorHandler.ts          Xu ly loi dong bo va bat dong bo, tra HTTP 500
  middlewares/notFoundHandler.ts       Tra HTTP 404 cho duong dan khong ton tai
  scripts/checkDatabase.ts             Kiem tra ket noi va dem so nhan vien
  utils/response.ts                    Gui ket qua JSON
  types/                              Khai bao kieu du lieu dung chung
```

Luong xu ly: Middleware -> Route -> Controller -> Service -> Repository.
Model mo ta nhan vien. Controller dung View va DTO de tao JSON tra ve.
`app.ts` khoi tao cac tang va truyen cac thanh phan phu thuoc qua constructor.
`createApp()` tra ung dung Express. Router duoc gan tai `/api/employees`.
Controller dung `RequestHandler`, middleware loi dung `ErrorRequestHandler`.
Middleware 404 duoc gan sau router, middleware loi duoc gan cuoi cung.

Repository doc toan bo nhan vien tu collection `employees` bang Mongoose.
Service va controller xu ly bat dong bo bang Promise va async/await.
Model luu day du thuoc tinh; DTO response chi tra 6 truong da chon.

## Chay

```sh
npm ci
npm run db:check
npm run dev
```

Tao `.env` dua tren `.env.example` neu chua co, dien URI ket noi Atlas vao `MONGODB_URI`.
URI phai co ten database `vietmind` sau hostname. Thong tin dang nhap chi nam trong `.env`.
File `.env` da duoc bo qua trong Git. Khong dua mat khau vao ma nguon hoac README.
Them IP cua may chay API vao IP Access List tren Atlas.

`npm run db:check` ket noi, khoi tao collection/chi muc neu chua co, ping va dem nhan vien.
May chu chi mo cong sau khi ket noi database thanh cong.

`npm run dev` chay truc tiep tu ma nguon TypeScript.
`npm start` bien dich vao `dist/` roi chay may chu; lenh nay se tao lai thu muc `dist`.
Kiem tra kieu: `npm run typecheck`. Bien dich: `npm run build`.
Doi cong trong PowerShell: `$env:PORT = '3001'`.

## GET /api/employees

```sh
curl "http://localhost:3000/api/employees"
```

Khong can tham so query. Neu truyen them query, API bo qua va van tra toan bo danh sach.
Ket qua khi chua co du lieu:

```json
{ "data": [] }
```

Them du lieu trong Atlas: mo database `vietmind`, collection `employees`, chon **Insert Document**.
Vi du mot document hop le (MongoDB tu tao `_id` khi insert):

```json
{
  "employeeId": "00000000-0000-4000-8000-000000000001",
  "employeeCode": "NV001",
  "displayName": "Nguyen Van An",
  "avatarUrl": null,
  "email": "an.nguyen@example.com",
  "phoneNumber": null,
  "department": "engineering",
  "position": "Lap trinh vien backend",
  "status": "active",
  "joinedAt": "2024-01-15"
}
```

Khi insert truc tiep tren Atlas, can tu dien cac truong nhu vi du; mac dinh va validation
cua Mongoose chi ap dung khi ghi qua Mongoose.
Schema tao chi muc unique cho `employeeId` va `employeeCode`.
Moi phan tu `data` khi co du lieu co dang:

```json
{
  "id": "00000000-0000-4000-8000-000000000001",
  "displayName": "Nguyen Van An",
  "avatarUrl": null,
  "email": "an.nguyen@example.com",
  "department": "engineering",
  "position": "Lap trinh vien backend"
}
```

Model dung `employeeId` bat buoc; DTO anh xa thanh `id`.
`EmployeeResponseDto` chi tra `id`, `displayName`, `avatarUrl`, `email`, `department`, `position`.
`employeeCode`, `phoneNumber`, `status`, `joinedAt` van nam trong model, khong duoc tra ve API.
`avatarUrl` va `phoneNumber` mac dinh la `null`.
`status` mac dinh la `active`, co the la `inactive`.
`joinedAt` la chuoi ngay `YYYY-MM-DD`.

Duong dan khong ton tai tra `404`, phuong thuc khac GET tra `405`.
Middleware ghi loi vao console va tra `500` voi thong bao chung.
Loi co dang `{ "error": { "code": "...", "message": "..." } }`.

`createApp()` tao ung dung Express; `connectDatabase()` khoi tao ket noi truoc khi chay API.
Ten bien, ten tep, duong dan API va ma loi duoc giu nguyen.
Cac import noi bo dung duoi `.js` theo NodeNext/ESM de chay duoc sau khi bien dich.
# VietMind
