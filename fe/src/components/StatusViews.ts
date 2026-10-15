import { escapeHtml } from '../utils/format';
import { icon } from '../utils/icons';

export function renderLoading(): string {
  return `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Đang tải danh sách người dùng...</p>
    </div>
  `;
}

export function renderError(message: string): string {
  return `
    <div class="error-state">
      <div class="error-icon">${icon('alert')}</div>
      <h3>Không thể tải dữ liệu</h3>
      <p>${escapeHtml(message)}</p>
      <button class="button button-primary" id="retry-btn">
        ${icon('refresh')}
        <span>Thử lại</span>
      </button>
    </div>
  `;
}

export function renderEmpty(hasFilter: boolean): string {
  return `
    <div class="empty-state">
      <div class="empty-icon">${icon('user')}</div>
      <h3>${hasFilter ? 'Không tìm thấy người dùng phù hợp' : 'Chưa có người dùng nào'}</h3>
      <p>${hasFilter ? 'Vui lòng thử lại với từ khóa tìm kiếm khác.' : 'Hệ thống hiện chưa có dữ liệu người dùng.'}</p>
    </div>
  `;
}
