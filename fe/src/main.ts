import './styles/main.css';
import { fetchUsers } from './api/userApi';
import { renderUserTable } from './components/UserTable';
import { renderError, renderLoading, renderEmpty } from './components/StatusViews';
import type { User } from './types/user';
import { normalize } from './utils/format';
import { icon } from './utils/icons';

interface State {
  users: User[];
  search: string;
  loading: boolean;
  error: string | null;
}

const state: State = {
  users: [],
  search: '',
  loading: true,
  error: null
};

const root = document.querySelector<HTMLDivElement>('#app');
if (!root) throw new Error('Không tìm thấy phần tử root #app.');

root.innerHTML = `
  <div class="container">
    <header class="page-header">
      <div class="header-left">
        <div class="logo-mark">${icon('user')}</div>
        <div>
          <h1>Danh sách người dùng</h1>
          <p class="subtitle">Quản lý và hiển thị thông tin nhân sự hệ thống</p>
        </div>
      </div>
      <div class="header-badge" id="user-count-badge">0 người dùng</div>
    </header>

    <div class="card">
      <div class="toolbar">
        <div class="search-wrap">
          <span class="search-icon">${icon('search')}</span>
          <input
            id="search-input"
            type="search"
            placeholder="Tìm theo tên, email, phòng ban, chức vụ..."
            aria-label="Tìm kiếm người dùng"
            autocomplete="off"
          />
        </div>
        <button id="refresh-btn" class="button" title="Làm mới danh sách">
          ${icon('refresh')}
          <span>Làm mới</span>
        </button>
      </div>

      <div id="content-area"></div>
    </div>
  </div>
`;

const searchInput = document.querySelector<HTMLInputElement>('#search-input')!;
const refreshBtn = document.querySelector<HTMLButtonElement>('#refresh-btn')!;
const badgeEl = document.querySelector<HTMLDivElement>('#user-count-badge')!;
const contentArea = document.querySelector<HTMLDivElement>('#content-area')!;

function getFilteredUsers(): User[] {
  const query = normalize(state.search.trim());
  if (!query) return state.users;
  return state.users.filter((user) => {
    const text = normalize(`${user.displayName} ${user.email} ${user.department} ${user.position}`);
    return text.includes(query);
  });
}

function updateView(): void {
  const filtered = getFilteredUsers();

  if (state.loading) {
    contentArea.innerHTML = renderLoading();
    badgeEl.textContent = 'Đang tải...';
    refreshBtn.disabled = true;
    return;
  }

  refreshBtn.disabled = false;

  if (state.error) {
    contentArea.innerHTML = renderError(state.error);
    badgeEl.textContent = 'Lỗi kết nối';
    const retryBtn = document.querySelector<HTMLButtonElement>('#retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        void loadData();
      });
    }
    return;
  }

  if (state.search.trim()) {
    badgeEl.textContent = `${filtered.length} / ${state.users.length} người dùng`;
  } else {
    badgeEl.textContent = `${state.users.length} người dùng`;
  }

  if (filtered.length === 0) {
    contentArea.innerHTML = renderEmpty(Boolean(state.search.trim()));
  } else {
    contentArea.innerHTML = renderUserTable(filtered);
  }
}

async function loadData(): Promise<void> {
  state.loading = true;
  state.error = null;
  updateView();

  try {
    state.users = await fetchUsers();
  } catch (err) {
    state.error = err instanceof Error ? err.message : 'Không thể kết nối đến máy chủ API.';
  } finally {
    state.loading = false;
    updateView();
  }
}

searchInput.addEventListener('input', () => {
  state.search = searchInput.value;
  updateView();
});

refreshBtn.addEventListener('click', () => {
  void loadData();
});

// Khởi chạy tải danh sách ban đầu
void loadData();
