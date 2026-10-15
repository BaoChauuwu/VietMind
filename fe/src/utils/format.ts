export const escapeHtml = (str: string): string =>
  str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c);

export const normalize = (value: string): string =>
  value.normalize('NFD').replace(/\p{M}/gu, '').replace(/[đĐ]/g, 'd').toLowerCase();

export const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (!parts[0]) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return ((parts[0][0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
};

export interface AvatarColor {
  bg: string;
  text: string;
  border: string;
}

const colorPalette: AvatarColor[] = [
  { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd' }, // Blue
  { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' }, // Green
  { bg: '#fef3c7', text: '#b45309', border: '#fde68a' }, // Amber
  { bg: '#f3e8ff', text: '#7e22ce', border: '#e9d5ff' }, // Purple
  { bg: '#ffe4e6', text: '#be123c', border: '#fecdd3' }  // Rose
];

export function getUserColor(index: number): AvatarColor {
  return colorPalette[index % colorPalette.length]!;
}
