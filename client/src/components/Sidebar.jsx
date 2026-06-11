// components/Sidebar.jsx
import React from 'react';

const NAV_MAIN = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'users',     label: 'Users',     icon: <UsersIcon /> },
  { id: 'projects',  label: 'Projects',  icon: <ProjectsIcon /> },
  { id: 'tasks',     label: 'Tasks',     icon: <TasksIcon /> },
  { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
];

const NAV_SYSTEM = [
  { id: 'notifications', label: 'Notifications', icon: <BellIcon /> },
  { id: 'settings',      label: 'Settings',       icon: <SettingsIcon /> },
];

// ── SVG Icons ──────────────────────────────────────────────
function DashboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="4"/>
      <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/>
      <path d="M19 11a3 3 0 1 0 0-6"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    </svg>
  );
}
function ProjectsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
function TasksIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
function AnalyticsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

// ── Sidebar styles ─────────────────────────────────────────
// Note: transform / transition are controlled by CSS classes (.sidebar, .sidebar.open)
// so media queries can properly override them. We only keep non-layout styles inline.
const sidebarStyles = {
  sidebar: {
    width: 'var(--sidebar-w)',
    minHeight: '100vh',
    background: 'var(--bg-sidebar)',
    boxShadow: 'var(--shadow-sidebar)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
    borderRight: '1px solid var(--color-border)',
    // No transform here — CSS class .sidebar handles it
  },
  logo: {
    padding: '22px 20px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    borderBottom: '1px solid var(--color-border)',
    marginBottom: 8,
  },
  logoMark: {
    width: 44,
    height: 44,
    background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontWeight: 800,
    fontSize: 20,
    boxShadow: '0 4px 12px rgba(15,118,110,0.35)',
    flexShrink: 0,
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.1,
  },
  logoName: {
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.12em',
    color: '#F9FAFB',
  },
  logoSub: {
    fontSize: 10,
    letterSpacing: '0.1em',
    color: '#9CA3AF',
    fontWeight: 500,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.14em',
    color: '#6B7280',
    padding: '16px 20px 6px',
    textTransform: 'uppercase',
  },
  navItem: (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 16px',
    margin: '2px 10px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    background: active ? '#0F766E' : 'transparent',
    color: active ? '#FFFFFF' : '#D1D5DB',
    fontWeight: active ? 600 : 400,
    fontSize: 14,
    transition: 'all 0.15s ease',
    border: 'none',
    textAlign: 'left',
    width: 'calc(100% - 20px)',
    fontFamily: 'var(--font-sans)',
  }),
  navIcon: (active) => ({
    color: active ? '#FFFFFF' : '#9CA3AF',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  }),
  spacer: { flex: 1 },
  userCard: {
    margin: '12px',
    padding: '12px 14px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    border: '1px solid rgba(255,255,255,0.08)',
  },
  avatar: {
    width: 34,
    height: 34,
    background: 'var(--color-primary)',
    borderRadius: 9,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 700,
    fontSize: 14,
    flexShrink: 0,
  },
  userName: {
    fontSize: 13,
    fontWeight: 600,
    color: '#F9FAFB',
    lineHeight: 1.2,
  },
  userRole: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: 400,
  },
};

export default function Sidebar({
  activeNav = 'dashboard',
  onNavChange,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <>
      {/* Overlay — shown on mobile when sidebar is open */}
      <div
        className={`sidebar-overlay${sidebarOpen ? ' show' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/*
        CSS class "sidebar" controls transform on mobile (slide in/out).
        On desktop the CSS resets transform to translateX(0) so it's always visible.
        We do NOT put transform in the inline style — that would override the CSS.
      */}
      <aside
        className={`sidebar${sidebarOpen ? ' open' : ''}`}
        style={sidebarStyles.sidebar}
      >
        {/* Logo */}
        <div style={sidebarStyles.logo}>
          <div style={sidebarStyles.logoMark}>N</div>
          <div style={sidebarStyles.logoText}>
            <span style={sidebarStyles.logoName}>NEXSPHERE</span>
            <span style={sidebarStyles.logoSub}>ADMIN PORTAL</span>
          </div>
        </div>

        {/* Main Menu */}
        <div style={sidebarStyles.sectionLabel}>Main Menu</div>
        {NAV_MAIN.map(item => (
          <button
            key={item.id}
            style={sidebarStyles.navItem(activeNav === item.id)}
            onClick={() => {
              onNavChange?.(item.id);
              setSidebarOpen(false); // close sidebar on nav on mobile
            }}
            onMouseEnter={e => {
              if (activeNav !== item.id) {
                e.currentTarget.style.background = 'rgba(20, 184, 166, 0.15)';
                e.currentTarget.style.color = '#F9FAFB';
              }
            }}
            onMouseLeave={e => {
              if (activeNav !== item.id) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#D1D5DB';
              }
            }}
          >
            <span style={sidebarStyles.navIcon(activeNav === item.id)}>{item.icon}</span>
            {item.label}
          </button>
        ))}

        {/* System */}
        <div style={sidebarStyles.sectionLabel}>System</div>
        {NAV_SYSTEM.map(item => (
          <button
            key={item.id}
            style={sidebarStyles.navItem(activeNav === item.id)}
            onClick={() => {
              onNavChange?.(item.id);
              setSidebarOpen(false);
            }}
            onMouseEnter={e => {
              if (activeNav !== item.id) {
                e.currentTarget.style.background = 'rgba(20,184,166,0.15)';
                e.currentTarget.style.color = '#FFFFFF';
              }
            }}
            onMouseLeave={e => {
              if (activeNav !== item.id) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#D1D5DB';
              }
            }}
          >
            <span style={sidebarStyles.navIcon(activeNav === item.id)}>{item.icon}</span>
            {item.label}
          </button>
        ))}

        <div style={sidebarStyles.spacer} />

        {/* User card */}
        <div style={sidebarStyles.userCard}>
          <div style={sidebarStyles.avatar}>N</div>
          <div>
            <div style={sidebarStyles.userName}>Admin User</div>
            <div style={sidebarStyles.userRole}>Super Admin</div>
          </div>
        </div>
      </aside>
    </>
  );
}
