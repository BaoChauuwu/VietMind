export interface User {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  email: string;
  department: string;
  position: string;
}

export type Employee = User;

function isUser(value: unknown): value is User {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (
    ['id', 'displayName', 'email', 'department', 'position'].every((key) => typeof item[key] === 'string') &&
    (item.avatarUrl === null || typeof item.avatarUrl === 'string')
  );
}

export function parseUsers(value: unknown): User[] {
  if (!value || typeof value !== 'object' || !('data' in value) || !Array.isArray(value.data) || !value.data.every(isUser)) {
    throw new Error('Dữ liệu người dùng không hợp lệ.');
  }
  return value.data;
}
