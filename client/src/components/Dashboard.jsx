// components/Dashboard.jsx
import React from 'react';
import MetricCard, {
  UsersMetricIcon,
  ProjectsMetricIcon,
  TasksMetricIcon,
  CompletedMetricIcon,
} from './MetricCard.jsx';
import RecentActivities from './RecentActivities.jsx';
import TaskCompletion from './TaskCompletion.jsx';

export const DEFAULT_METRICS = [
  { id: 'users',     icon: <UsersMetricIcon />,     value: 8342, label: 'Total Users',     progress: 72 },
  { id: 'projects',  icon: <ProjectsMetricIcon />,  value: 124,  label: 'Total Projects',  progress: 45 },
  { id: 'tasks',     icon: <TasksMetricIcon />,     value: 1890, label: 'Total Tasks',     progress: 60 },
  { id: 'completed', icon: <CompletedMetricIcon />, value: 1204, label: 'Completed Tasks', progress: 64 },
];

const s = {
  greetingTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: 'var(--color-text)',
    fontFamily: 'var(--font-serif)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    lineHeight: 1.2,
  },
  greetingSub: {
    fontSize: 13,
    color: 'var(--color-text-secondary)',
    marginTop: 4,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: '50%',
    background: 'var(--color-primary-light)',
    display: 'inline-block',
    flexShrink: 0,
  },
};

function todayString() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function Dashboard({
  adminName = 'Admin',
  metrics = DEFAULT_METRICS,
  activities,
  tasksCompleted = 1204,
  tasksRemaining = 686,
  loading = false,
  onMetricClick,
  onViewAllActivities,
  onViewAllTasks,
  onNewReport,
}) {
  return (
    <main className="dashboard-container">

      {/* Greeting — no "New Report" button here; it lives in the Header */}
      <div className="dashboard-header-row">
        <div>
          <div style={s.greetingTitle}>
            Good morning, {adminName} 👋
          </div>
          <div style={s.greetingSub}>
            <span>{todayString()}</span>
            <span style={s.dot} />
            <span>Here's your overview</span>
          </div>
        </div>
      </div>

      {/* Metric Cards — 4-col grid via CSS, collapses on tablet/mobile */}
      <div className="dashboard-metrics">
        {metrics.map(m => (
          <MetricCard
            key={m.id}
            icon={m.icon}
            value={m.value}
            label={m.label}
            progress={m.progress}
            onClick={() => onMetricClick?.(m.id)}
          />
        ))}
      </div>

      {/* Bottom row */}
      <div className="dashboard-bottom">
        <div className="dashboard-activities">
          <RecentActivities
            activities={activities}
            onViewAll={onViewAllActivities}
            loading={loading}
          />
        </div>
        <div className="dashboard-completion">
          <TaskCompletion
            completed={tasksCompleted}
            remaining={tasksRemaining}
            onViewAll={onViewAllTasks}
            loading={loading}
          />
        </div>
      </div>

    </main>
  );
}
