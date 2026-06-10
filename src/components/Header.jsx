// components/Header.jsx
import React, { useState } from 'react';

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function HistoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/>
      <path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}
function ReportIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

const s = {
  header: {
    background: '#FFFFFF',
    borderBottom: '1px solid var(--color-border)',
    padding: '0 20px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    gap: 12,
  },
  breadcrumb: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--color-text)',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  breadcrumbPath: {
    fontSize: 12,
    color: 'var(--color-text-light)',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    marginTop: 1,
  },
  breadSep: { fontSize: 10, color: 'var(--color-border)' },
  btnOutline: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 14px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-border)',
    background: 'var(--bg-card)',
    color: 'var(--color-text)',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    transition: 'all 0.15s',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  dropdown: {
    position: 'relative',
    display: 'inline-block',
    flexShrink: 0,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    right: 0,
    background: 'var(--bg-card)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    boxShadow: '0 12px 30px rgba(17, 24, 39, 0.12)',
    minWidth: 160,
    zIndex: 200,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: '9px 14px',
    fontSize: 13,
    color: 'var(--color-text)',
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    textAlign: 'left',
    border: 'none',
    background: 'none',
    fontFamily: 'var(--font-sans)',
    transition: 'background 0.1s',
  },
  btnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 14px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-primary)',
    background: 'var(--color-primary)',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    transition: 'all 0.15s',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  // ─── KEY FIX: No display property here at all.
  // Visibility is 100% controlled by the CSS class .mobile-menu-btn
  // (display:none on desktop, display:flex on mobile via media query).
  // Adding display:'flex' inline would override the CSS and keep it always visible.
  mobileMenuBtn: {
    cursor: 'pointer',
    marginRight: 6,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text)',
  },
};

export default function Header({ onNewReport, onQuickAdd, sidebarOpen, setSidebarOpen }) {
  const [activityOpen, setActivityOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen]  = useState(false);

  return (
    <header style={s.header}>

      {/* Hamburger — CSS class controls display (none on desktop, flex on mobile) */}
      <div
        className="mobile-menu-btn"
        style={s.mobileMenuBtn}
        onClick={() => setSidebarOpen(true)}
      >
        <MenuIcon />
      </div>

      {/* Breadcrumb */}
      <div style={s.breadcrumb}>
        <span className="page-title-text" style={s.pageTitle}>Dashboard Overview</span>
        <div className="breadcrumb-path" style={s.breadcrumbPath}>
          <span>Home</span>
          <span style={s.breadSep}>›</span>
          <span>Dashboard</span>
        </div>
      </div>

      {/* Actions */}
      <div className="header-actions">

        {/* Recent Activity dropdown */}
        <div style={s.dropdown}>
          <button
            style={s.btnOutline}
            onClick={() => { setActivityOpen(o => !o); setQuickAddOpen(false); }}
          >
            <HistoryIcon />
            <ChevronDown />
          </button>
          {activityOpen && (
            <div style={s.dropdownMenu}>
              <div style={{
                padding: '8px 14px',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: 'var(--color-text-light)',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--color-border)',
              }}>
                Recent Activity
              </div>
              {['User registered', 'Project created', 'Task completed'].map(a => (
                <button key={a} style={s.dropdownItem}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-accent-light)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >{a}</button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Add dropdown */}
        <div style={s.dropdown}>
          <button
            style={s.btnPrimary}
            onClick={() => { setQuickAddOpen(o => !o); setActivityOpen(false); }}
          >
            <PlusIcon />
            <span className="quick-add-label">Quick Add</span>
            <ChevronDown />
          </button>
          {quickAddOpen && (
            <div style={s.dropdownMenu}>
              {['New User', 'New Project', 'New Task', 'New Report'].map(item => (
                <button key={item} style={s.dropdownItem}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(20, 184, 166, 0.10)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  onClick={() => { onQuickAdd?.(item); setQuickAddOpen(false); }}
                >{item}</button>
              ))}
            </div>
          )}
        </div>

        {/* New Report — single source of truth in the header */}
        <button style={s.btnPrimary} onClick={onNewReport}>
          <ReportIcon />
          <span className="header-new-report-text">New Report</span>
        </button>

      </div>
    </header>
  );
}
