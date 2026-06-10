// components/RecentActivities.jsx
import React from 'react';

// ── Activity type icons ──────────────────────────────────────
function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="4"/>
      <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/>
      <path d="M19 11a3 3 0 1 0 0-6"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    </svg>
  );
}
function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

const ICON_MAP = {
  user:     <UserIcon />,
  project:  <FolderIcon />,
  task:     <LockIcon />,
  settings: <GearIcon />,
};

// ── Default data (replace with API data) ────────────────────
export const DEFAULT_ACTIVITIES = [
  { id: 1, type: 'user',     title: 'New user registered',  description: 'sarah.k@email.com joined the platform',    time: '2m ago'  },
  { id: 2, type: 'project',  title: 'Project created',      description: 'NexPay v3.0 — by Dev Team',                time: '45m ago' },
  { id: 3, type: 'task',     title: 'Task completed',       description: 'UI review for Dashboard module',           time: '1h ago'  },
  { id: 4, type: 'settings', title: 'Settings updated',     description: 'Security policy modified by Admin',        time: '3h ago'  },
  { id: 5, type: 'user',     title: 'User role changed',    description: 'mike.j@email.com → Project Manager',       time: '5h ago'  },
];

// ── Styles ───────────────────────────────────────────────────
const s = {
  card: {
    background: 'var(--bg-card)',
    borderRadius: 'var(--radius-card)',
    padding: '22px',
    boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--color-border)',
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  titleIcon: {
    color: 'var(--color-text-secondary)',
    display: 'flex',
  },
  title: {
    fontSize: 15,
    fontWeight: 600,
    color: 'var(--color-text)',
  },
  viewAll: {
    fontSize: 12,
    color: 'var(--color-primary)',
    fontWeight: 500,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    fontFamily: 'var(--font-sans)',
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    flexShrink: 0,              // ← don't let button shrink away
    whiteSpace: 'nowrap',
  },
  activityRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'var(--bg-accent-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-primary)',
    flexShrink: 0,              // ← never squeeze the icon
    border: '1px solid var(--color-border)',
  },
  activityContent: {
    flex: 1,
    minWidth: 0,                // ← critical: allows text to truncate
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--color-text)',
    lineHeight: 1.3,
    // Truncate long titles on small screens
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  activityDesc: {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
    marginTop: 2,
    lineHeight: 1.4,
    // Allow description to wrap rather than overflow
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  activityTime: {
    fontSize: 11,
    color: 'var(--color-text-light)',
    flexShrink: 0,
    marginTop: 2,
    whiteSpace: 'nowrap',
    // Give the time a minimum width so it doesn't get pushed to nothing
    minWidth: 44,
    textAlign: 'right',
  },
};

function ActivityRow({ activity }) {
  return (
    <div style={s.activityRow}>
      <div style={s.iconCircle}>{ICON_MAP[activity.type] || ICON_MAP.user}</div>
      <div style={s.activityContent}>
        <div style={s.activityTitle}>{activity.title}</div>
        <div style={s.activityDesc}>{activity.description}</div>
      </div>
      <div style={s.activityTime}>{activity.time}</div>
    </div>
  );
}

/**
 * RecentActivities
 * @param {Object}   props
 * @param {Array}    props.activities   Array of activity objects (from API)
 * @param {Function} props.onViewAll
 * @param {boolean}  props.loading
 */
export default function RecentActivities({
  activities = DEFAULT_ACTIVITIES,
  onViewAll,
  loading = false,
}) {
  return (
    <div style={s.card}>
      <div style={s.header}>
        <div style={s.titleRow}>
          <span style={s.titleIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="7" r="4"/>
              <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/>
              <path d="M19 11a3 3 0 1 0 0-6"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            </svg>
          </span>
          <span style={s.title}>Recent Activities</span>
        </div>
        <button style={s.viewAll} onClick={onViewAll}>
          View all →
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--color-text-light)', fontSize: 13 }}>
          Loading activities…
        </div>
      ) : (
        <div>
          {activities.map((a, i) => (
            <ActivityRow key={a.id ?? i} activity={a} />
          ))}
        </div>
      )}
    </div>
  );
}
