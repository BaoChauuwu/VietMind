import { config } from 'dotenv';
import mongoose from 'mongoose';
import { EmployeeModel } from '../models/employeeModel.js';

config({ quiet: true });

export async function connectDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Thieu MONGODB_URI trong file .env.');
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000
    });
    // Khoi tao collection va cac chi muc truoc khi nhan yeu cau.
    await EmployeeModel.init();
  } catch (error) {
    await mongoose.disconnect();
    const message = error instanceof Error ? error.message : '';
    if (/authentication|bad auth/i.test(message)) {
      throw new Error('Dang nhap MongoDB that bai. Kiem tra database user va mat khau trong .env.');
    }
    // Khong ghi URI hay mat khau tu loi cua driver ra console.
    throw new Error('Khong the ket noi MongoDB. Kiem tra cluster, MONGODB_URI va IP Access List tren Atlas.');
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
