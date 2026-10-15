import { parseUsers, type User } from '../types/user';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/employees', {
    headers: { Accept: 'application/json' },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Máy chủ phản hồi với mã lỗi ${response.status}`);
  }

  const json: unknown = await response.json();
  return parseUsers(json);
}
