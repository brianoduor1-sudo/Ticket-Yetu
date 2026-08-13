import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../hooks/useNotifications';

const TYPE_ICON = {
  booking_confirmed: '🎟️',
  event_updated: '✏️',
  event_cancelled: '⚠️',
};

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// Module 4 (Content Highlights & CI/CD). Reads from NotificationsContext,
// which is populated by triggers in bookingService/eventService.
export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleItemClick(n) {
    markAsRead(n.id);
    setOpen(false);
    if (n.eventId) navigate(`/events/${n.eventId}`);
  }

  return (
    <div className="bell-wrap" ref={ref}>
      <button className="bell-btn" onClick={() => setOpen((o) => !o)} aria-label="Notifications">
        🔔
        {unreadCount > 0 && <span className="bell-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>}
      </button>

      {open && (
        <div className="bell-panel">
          <div className="bell-panel-head">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <button className="btn-ghost" style={{ fontSize: 12 }} onClick={markAllAsRead}>
                Mark all read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="bell-empty">You're all caught up.</div>
          ) : (
            <div className="bell-list">
              {notifications.slice(0, 12).map((n) => (
                <button
                  key={n.id}
                  className={`bell-item ${n.read ? '' : 'unread'}`}
                  onClick={() => handleItemClick(n)}
                >
                  <span className="bell-item-icon">{TYPE_ICON[n.type] || '🔔'}</span>
                  <span className="bell-item-body">
                    <span className="bell-item-title">{n.title}</span>
                    <span className="bell-item-msg">{n.message}</span>
                    <span className="bell-item-time">{timeAgo(n.createdAt)}</span>
                  </span>
                  {!n.read && <span className="bell-item-dot" />}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}