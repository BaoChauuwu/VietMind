# Cong dung cac file Backend

Backend nam trong thu muc `be/`, su dung Express, TypeScript va Mongoose de lay danh sach nhan vien tu MongoDB Atlas.
Tai lieu nay mo ta trach nhiem cua tung file va moi lien he giua cac tang trong backend.

## Luong xu ly danh sach nhan vien

1. `server.ts` ket noi database va khoi dong may chu.
2. `app.ts` gan middleware va router vao ung dung Express.
3. `employeeRoutes.ts` nhan yeu cau `GET /api/employees` va chuyen cho controller.
4. `employeeController.ts` goi service de lay du lieu.
5. `employeeService.ts` chuyen viec truy cap du lieu cho repository.
6. `employeeRepository.ts` dung `EmployeeModel` de doc collection `employees` trong MongoDB.
7. Du lieu quay lai controller, duoc chuyen thanh `EmployeeResponseDto`, roi gui ve duoi dang JSON bang `sendJson()`.

## Cac file ma nguon trong be/src

### app.ts

Khoi tao va lap rap ung dung Express.

- `createApp()` tao repository, service va controller, sau do truyen cac thanh phan phu thuoc qua constructor.
- Gan router nhan vien vao `/api/employees`.
- Cau hinh CORS va xu ly yeu cau OPTIONS.
- Gan middleware 404 sau router va middleware xu ly loi o cuoi luong.
- Tat header `X-Powered-By`.

Viec ket noi database va mo cong nam trong `server.ts`.

### server.ts

Diem bat dau cua backend.

- Doc va kiem tra cong trong bien `PORT`.
- Goi `connectDatabase()` truoc khi mo cong nhan yeu cau.
- Lay ung dung tu `createApp()` va khoi dong may chu HTTP.
- Xu ly loi khi khong the mo cong.
- Dong may chu va ngat ket noi database khi nhan tin hieu dung chuong trinh.

### config/database.ts

Quan ly ket noi MongoDB Atlas.

- Nap bien moi truong tu `.env` bang dotenv.
- `connectDatabase()` doc `MONGODB_URI` va mo ket noi bang Mongoose.
- Khoi tao collection va cac chi muc cua `EmployeeModel`.
- Gioi han thoi gian cho ket noi database.
- Chuyen loi ket noi thanh thong bao chung, tranh ghi URI va mat khau ra console.
- `disconnectDatabase()` dong ket noi MongoDB.

### routes/employeeRoutes.ts

Anh xa duong dan va phuong thuc HTTP den controller.

- `createEmployeeRouter()` tao Express Router cho nhan vien.
- Cho phep phuong thuc GET tai duong dan goc cua router.
- Chuyen yeu cau hop le sang `controller.getEmployees`.
- Tra HTTP 405 va header `Allow: GET` cho phuong thuc khong duoc ho tro tai duong dan nay.

Router dieu huong yeu cau, khong truc tiep truy van database.

### controllers/employeeController.ts

Tiep nhan yeu cau HTTP va tra ket qua danh sach nhan vien.

- `getEmployees` la mot `RequestHandler` cua Express.
- Cho ket qua tu `employeeService.listEmployees()`.
- Chuyen tung nhan vien thanh `EmployeeResponseDto`.
- Goi `sendJson()` de tra HTTP 200 voi du lieu dang `{ data: [...] }`.

Controller hien tra toan bo danh sach, khong xu ly tim kiem, bo loc hay phan trang.

### services/employeeService.ts

Tang dieu phoi nghiep vu nhan vien.

- Nhan `EmployeeRepository` qua constructor.
- `listEmployees()` goi `repository.findAll()` va tra Promise chua danh sach nhan vien.
- Hien chua co quy tac nghiep vu bo sung.

Cac quy tac nghiep vu lien quan den nhan vien duoc dat tai tang nay. Service khong truc tiep gui HTTP response.

### repository/employeeRepository.ts

Tang truy cap du lieu nhan vien.

- `findAll()` dung `EmployeeModel.find()` de lay toan bo document trong collection `employees`.
- `.lean()` lay cac doi tuong du lieu thuan thay vi Mongoose document day du.
- Chuyen tung document thanh doi tuong `Employee` truoc khi tra ve service.

Nhung thay doi ve cach truy van MongoDB duoc dat o tang nay.

### models/employeeModel.ts

Mo ta nhan vien va cau truc luu tru trong MongoDB.

| Thanh phan | Cong dung |
| --- | --- |
| `EmployeeStatus` | Gioi han trang thai thanh `active` hoac `inactive`. |
| `EmployeeAttributes` | Khai bao kieu cac thuoc tinh truyen vao constructor cua `Employee`. |
| `Employee` | Doi tuong nhan vien voi day du thuoc tinh; dat gia tri mac dinh cho avatar, so dien thoai va trang thai. |
| `employeeSchema` | Khai bao kieu du lieu, truong bat buoc, gia tri mac dinh va cac rang buoc cua Mongoose. |
| `EmployeeModel` | Model Mongoose dung de truy van va luu document vao collection `employees`. |

Cac truong cua model:

| Truong | Y nghia |
| --- | --- |
| `employeeId` | Ma dinh danh nhan vien; schema tu sinh UUID neu chua truyen vao. |
| `employeeCode` | Ma nhan vien. |
| `displayName` | Ten hien thi cua nhan vien. |
| `avatarUrl` | Duong dan anh dai dien; mac dinh `null`. |
| `email` | Dia chi email; schema loai khoang trang hai dau va chuyen ve chu thuong. |
| `phoneNumber` | So dien thoai; mac dinh `null`. |
| `department` | Phong ban. |
| `position` | Vi tri cong viec. |
| `status` | Trang thai nhan vien; mac dinh `active`. |
| `joinedAt` | Ngay vao lam; schema kiem tra mau chuoi `YYYY-MM-DD`. |

Schema khai bao chi muc unique cho `employeeId` va `employeeCode`.
Cac gia tri mac dinh va validation cua Mongoose ap dung khi ghi du lieu qua Mongoose.

### dtos/employeeResponseDto.ts

Chon nhung truong duoc tra ve qua API.

`EmployeeResponseDto` nhan mot doi tuong `Employee` va chi lay 6 truong:

| Truong tra ve | Nguon tu model |
| --- | --- |
| `id` | `employeeId` |
| `displayName` | `displayName` |
| `avatarUrl` | `avatarUrl` |
| `email` | `email` |
| `department` | `department` |
| `position` | `position` |

`employeeCode`, `phoneNumber`, `status` va `joinedAt` van duoc luu trong model, nhung khong nam trong response hien tai.
DTO giup thay doi du lieu tra ve ma khong can doi cau truc luu tru.

### middlewares/notFoundHandler.ts

Xu ly yeu cau khong khop voi router nao.

- Tra HTTP 404.
- Dung ma loi `NOT_FOUND`.
- Tra thong bao loi duoi dang JSON.

### middlewares/errorHandler.ts

Xu ly loi phat sinh trong luong Express.

- Nhan loi tu cac handler hoac middleware truoc do.
- Ghi loi vao console va tra HTTP 500 voi ma `INTERNAL_SERVER_ERROR`.
- Tra thong bao chung cho client.
- Neu response da gui header, chuyen loi cho middleware xu ly loi tiep theo thay vi gui JSON lan nua.

### utils/response.ts

Chua ham `sendJson()` de thong nhat cach gui ket qua.

- Dat HTTP status code.
- Gan header `Cache-Control: no-store` va cac header bo sung neu co.
- Gui noi dung JSON qua Express response.

Ham nay duoc controller, router va middleware dung chung.

### types/employee.ts

Khai bao kieu du lieu response danh sach nhan vien.

- `EmployeeListResponse` mo ta response co truong `data` la mang `EmployeeResponseDto`.
- Export lai kieu `Employee` va `EmployeeStatus` de cac file khac co the su dung.

File nay ho tro TypeScript kiem tra kieu, khong thuc hien truy van hay gui response.

### types/api.ts

Khai bao `ApiErrorResponse`, la cau truc JSON cua loi API.

- `error.code`: ma loi `NOT_FOUND`, `METHOD_NOT_ALLOWED` hoac `INTERNAL_SERVER_ERROR`.
- `error.message`: thong bao loi.

Cac ma loi giup client phan biet tung truong hop loi.

## Cac file cau hinh trong be

| File | Cong dung |
| --- | --- |
| `.env` | Chua gia tri moi truong that nhu URI ket noi MongoDB va cong may chu. |
| `.env.example` | Mo ta cac bien moi truong can co bang gia tri mau; khong chua thong tin dang nhap that. |
| `.gitignore` | Danh dau cac tep va thu muc khong dua vao Git, gom thu vien, ket qua bien dich va `.env`. |
| `package.json` | Khai bao thong tin backend, thu vien phu thuoc va cac tac vu cua project. |
| `package-lock.json` | Ghi lai phien ban cu the va quan he phu thuoc cua cac thu vien. |
| `tsconfig.json` | Cau hinh TypeScript, che do kiem tra kieu strict va cac quy tac kiem tra ma nguon. |
| `tsconfig.build.json` | Ke thua cau hinh TypeScript va quy dinh cach bien dich ma nguon trong `src` sang JavaScript. |
