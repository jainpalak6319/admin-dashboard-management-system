// components/MetricCard.jsx
import React from 'react';

// ── Icons ────────────────────────────────────────────────────
export function UsersMetricIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="4"/>
      <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/>
      <path d="M19 11a3 3 0 1 0 0-6"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    </svg>
  );
}
export function ProjectsMetricIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
export function TasksMetricIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
export function CompletedMetricIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

// ── Progress Bar ──────────────────────────────────────────────
function ProgressBar({ value = 60 }) {
  return (
    <div style={{
      marginTop: 18,
      height: 4,
      borderRadius: 99,
      background: 'var(--color-border)',
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${Math.min(100, Math.max(0, value))}%`,
        height: '100%',
        borderRadius: 99,
        background: 'linear-gradient(90deg, var(--color-primary-light), var(--color-primary))',
        transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }} />
    </div>
  );
}

// ── MetricCard ────────────────────────────────────────────────
const s = {
  card: {
    background: 'var(--bg-card)',
    borderRadius: 'var(--radius-card)',
    padding: '22px 22px 18px',
    boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--color-border)',
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    cursor: 'default',
    // ↓ Removed `flex: '1 1 0'` — parent is now a CSS grid,
    //   so the card just fills its grid cell naturally.
    //   width: 100% ensures it fills the cell on all breakpoints.
    width: '100%',
    minWidth: 0,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    background: 'var(--bg-accent-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-primary)',
    marginBottom: 14,
  },
  value: {
    fontSize: 32,
    fontWeight: 700,
    color: 'var(--color-text)',
    lineHeight: 1,
    fontFamily: 'var(--font-serif)',
    letterSpacing: '-0.02em',
  },
  label: {
    fontSize: 13,
    color: 'var(--color-text-secondary)',
    marginTop: 4,
    fontWeight: 400,
  },
};

/**
 * MetricCard
 * @param {Object}   props
 * @param {ReactNode} props.icon
 * @param {string|number} props.value
 * @param {string}   props.label
 * @param {number}   props.progress  0–100
 * @param {Function} props.onClick
 */
export default function MetricCard({ icon, value, label, progress = 50, onClick }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        ...s.card,
        boxShadow: hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div style={s.iconWrap}>{icon}</div>
      <div style={s.value}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div style={s.label}>{label}</div>
      <ProgressBar value={progress} />
    </div>
  );
}
