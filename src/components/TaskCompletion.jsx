// components/TaskCompletion.jsx
import React from 'react';

// ── SVG Donut ────────────────────────────────────────────────
function DonutChart({ completed = 1204, remaining = 686 }) {
  const total = completed + remaining;
  const pct   = total > 0 ? (completed / total) * 100 : 0;

  // Responsive size: use a viewBox-based SVG so it scales with its container.
  // We define the geometry at SIZE=180 but let CSS control the rendered size.
  const SIZE   = 180;
  const STROKE = 22;
  const R      = (SIZE - STROKE) / 2;
  const CIRC   = 2 * Math.PI * R;
  const GAP    = 4; // degrees gap between arcs
  const gapRad = (GAP / 360) * CIRC;

  const completedLen = (pct / 100) * CIRC - gapRad;
  const remainingLen = CIRC - (pct / 100) * CIRC - gapRad;

  const cx = SIZE / 2;
  const cy = SIZE / 2;

  return (
    /*
      Key fix: replace fixed width/height pixel wrapper with a responsive one.
      max-width caps it on desktop; width: 100% lets it shrink on mobile.
      padding-bottom trick (aspect-ratio square) is not needed because we
      use the SVG's own viewBox — the SVG scales itself.
    */
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 180,
      margin: '0 auto',
      aspectRatio: '1 / 1',     // keeps the container square as it resizes
    }}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          width: '100%',
          height: '100%',
          transform: 'rotate(-90deg)',
          display: 'block',
        }}
      >
        {/* Track */}
        <circle
          cx={cx} cy={cy} r={R}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={STROKE}
        />
        {/* Remaining arc */}
        <circle
          cx={cx} cy={cy} r={R}
          fill="none"
          stroke="#D1D5DB"
          strokeWidth={STROKE}
          strokeDasharray={`${remainingLen} ${CIRC}`}
          strokeDashoffset={-completedLen - gapRad}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)' }}
        />
        {/* Completed arc */}
        <circle
          cx={cx} cy={cy} r={R}
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth={STROKE}
          strokeDasharray={`${completedLen} ${CIRC}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#0F766E" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center label — absolutely positioned over SVG */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          fontSize: 'clamp(18px, 4vw, 26px)',   // ← scales with viewport
          fontWeight: 700,
          color: 'var(--color-text)',
          fontFamily: 'var(--font-serif)',
          letterSpacing: '-0.02em',
        }}>
          {pct.toFixed(1)}%
        </div>
        <div style={{
          fontSize: 'clamp(8px, 1.8vw, 10px)',   // ← scales with viewport
          fontWeight: 600,
          letterSpacing: '0.12em',
          color: 'var(--color-text-light)',
          textTransform: 'uppercase',
          marginTop: 2,
        }}>
          Completed
        </div>
      </div>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────
const s = {
  card: {
    background: 'var(--bg-card)',
    borderRadius: 'var(--radius-card)',
    padding: '22px',
    boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--color-border)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  titleRow: { display: 'flex', alignItems: 'center', gap: 8 },
  titleIcon: { color: 'var(--color-text-secondary)', display: 'flex' },
  title: { fontSize: 15, fontWeight: 600, color: 'var(--color-text)' },
  viewAll: {
    fontSize: 12,
    color: 'var(--color-primary)',
    fontWeight: 500,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    fontFamily: 'var(--font-sans)',
    transition: 'all 0.15s ease',
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    margin: '16px 0',
    flexWrap: 'wrap',           // ← wraps on very narrow screens
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    color: 'var(--color-text-secondary)',
  },
  legendDot: (color) => ({
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: color,
    flexShrink: 0,
  }),
  statsRow: {
    display: 'flex',
    borderTop: '1px solid var(--color-border)',
    marginTop: 'auto',
    paddingTop: 16,
  },
  statCell: { flex: 1, textAlign: 'center' },
  statValue: {
    fontSize: 'clamp(16px, 3vw, 22px)',  // ← responsive font size
    fontWeight: 700,
    color: 'var(--color-text)',
    fontFamily: 'var(--font-serif)',
  },
  statLabel: { fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 },
  divider: {
    width: 1,
    background: 'var(--color-border)',
    margin: '0 8px',
    alignSelf: 'stretch',
  },
};

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

/**
 * TaskCompletion
 * @param {Object}   props
 * @param {number}   props.completed
 * @param {number}   props.remaining
 * @param {Function} props.onViewAll
 * @param {boolean}  props.loading
 */
export default function TaskCompletion({
  completed = 1204,
  remaining = 686,
  onViewAll,
  loading = false,
}) {
  return (
    <div style={s.card}>
      <div style={s.header}>
        <div style={s.titleRow}>
          <span style={s.titleIcon}><CheckCircleIcon /></span>
          <span style={s.title}>Task Completion Analytics</span>
        </div>
        <button style={s.viewAll} onClick={onViewAll}>View all →</button>
      </div>

      {loading ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-light)', fontSize: 13 }}>
          Loading…
        </div>
      ) : (
        <>
          <DonutChart completed={completed} remaining={remaining} />

          <div style={s.legend}>
            <div style={s.legendItem}>
              <div style={s.legendDot('#0F766E')} />
              Completed
            </div>
            <div style={s.legendItem}>
              <div style={s.legendDot('#D1D5DB')} />
              Remaining
            </div>
          </div>

          <div style={s.statsRow}>
            <div style={s.statCell}>
              <div style={s.statValue}>{completed.toLocaleString()}</div>
              <div style={s.statLabel}>Completed</div>
            </div>
            <div style={s.divider} />
            <div style={s.statCell}>
              <div style={s.statValue}>{remaining.toLocaleString()}</div>
              <div style={s.statLabel}>Remaining</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
