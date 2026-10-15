import type { User } from '../types/user';
import { escapeHtml, getInitials, getUserColor } from '../utils/format';
import { icon } from '../utils/icons';

export function renderUserTable(users: User[]): string {
  return `
    <div class="table-responsive">
      <table class="user-table">
        <thead>
          <tr>
            <th scope="col" style="width: 50px;">#</th>
            <th scope="col">Họ và tên</th>
            <th scope="col">Email</th>
            <th scope="col">Phòng ban</th>
            <th scope="col">Chức vụ</th>
          </tr>
        </thead>
        <tbody>
          ${users
            .map((user, index) => {
              const userColor = getUserColor(index);
              const initials = getInitials(user.displayName);
              const avatarHtml =
                user.avatarUrl && /^https?:\/\//i.test(user.avatarUrl)
                  ? `<img src="${escapeHtml(user.avatarUrl)}" alt="" class="user-avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><span class="user-avatar-fallback" style="background:${userColor.bg}; color:${userColor.text}; display:none;">${escapeHtml(initials)}</span>`
                  : `<span class="user-avatar-fallback" style="background:${userColor.bg}; color:${userColor.text}; border-color:${userColor.border};">${escapeHtml(initials)}</span>`;

              return `
              <tr>
                <td class="col-index">${index + 1}</td>
                <td>
                  <div class="user-cell">
                    <div class="user-avatar-wrap">
                      ${avatarHtml}
                    </div>
                    <div class="user-info">
                      <strong class="user-name">${escapeHtml(user.displayName)}</strong>
                    </div>
                  </div>
                </td>
                <td>
                  <a class="email-link" href="mailto:${escapeHtml(user.email)}" title="Gửi email tới ${escapeHtml(user.email)}">
                    ${icon('mail')}
                    <span>${escapeHtml(user.email)}</span>
                  </a>
                </td>
                <td>
                  <span class="dept-badge">
                    ${icon('building')}
                    <span>${escapeHtml(user.department)}</span>
                  </span>
                </td>
                <td>
                  <span class="position-badge">${escapeHtml(user.position)}</span>
                </td>
              </tr>
            `;
            })
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}
