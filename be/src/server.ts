import { createApp } from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';

const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT phai la so nguyen tu 1 den 65535.');
}

try {
  await connectDatabase();
  const app = createApp();
  const server = app.listen(port, '127.0.0.1', (error) => {
    if (error) return;
    console.log('Da ket noi MongoDB Atlas.');
    console.log(`API danh sach nhan vien: http://localhost:${port}/api/employees`);
  });
  server.on('error', async () => {
    console.error(`Khong the chay API. Cong ${port} co the dang duoc su dung; hay dong phien BE cu roi chay lai.`);
    process.exitCode = 1;
    await disconnectDatabase();
  });
  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.once(signal, () => {
      server.close(() => {
        void disconnectDatabase().catch(() => { process.exitCode = 1; });
      });
    });
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Khong the khoi dong API.');
  process.exitCode = 1;
}
