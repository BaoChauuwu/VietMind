import { randomUUID } from 'node:crypto';
import { model, Schema } from 'mongoose';

export type EmployeeStatus = 'active' | 'inactive';

export interface EmployeeAttributes {
  employeeId: string;
  employeeCode: string;
  displayName: string;
  avatarUrl?: string | null;
  email: string;
  phoneNumber?: string | null;
  department: string;
  position: string;
  status?: EmployeeStatus;
  /** Ngay vao lam, dinh dang YYYY-MM-DD. */
  joinedAt: string;
}

export class Employee {
  employeeId: string;
  employeeCode: string;
  displayName: string;
  avatarUrl: string | null;
  email: string;
  phoneNumber: string | null;
  department: string;
  position: string;
  status: EmployeeStatus;
  joinedAt: string;

  constructor(attributes: EmployeeAttributes) {
    this.employeeId = attributes.employeeId;
    this.employeeCode = attributes.employeeCode;
    this.displayName = attributes.displayName;
    this.avatarUrl = attributes.avatarUrl ?? null;
    this.email = attributes.email;
    this.phoneNumber = attributes.phoneNumber ?? null;
    this.department = attributes.department;
    this.position = attributes.position;
    this.status = attributes.status ?? 'active';
    this.joinedAt = attributes.joinedAt;
  }
}

const employeeSchema = new Schema<Employee>({
  employeeId: { type: String, required: true, default: () => randomUUID(), unique: true },
  employeeCode: { type: String, required: true, trim: true, unique: true },
  displayName: { type: String, required: true, trim: true },
  avatarUrl: { type: String, default: null },
  email: { type: String, required: true, trim: true, lowercase: true },
  phoneNumber: { type: String, default: null },
  department: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active', required: true },
  joinedAt: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ }
}, {
  collection: 'employees',
  versionKey: false,
  bufferCommands: false
});

export const EmployeeModel = model<Employee>('Employee', employeeSchema);
