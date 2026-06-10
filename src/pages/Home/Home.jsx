
import React, { useState, useCallback } from 'react';
import Sidebar   from '../../components/Sidebar.jsx';
import Header    from '../../components/Header.jsx';
import Dashboard from '../../components/Dashboard.jsx';
import './Home.css';

// Only non-layout styles remain inline — layout is handled by CSS classes
const layout = {
  root:    { display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' },
  content: { flex: 1, overflowY: 'auto' },
};

export default function Home() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Placeholder handlers — wire to your API / router ─────────
  const handleNewReport      = useCallback(() => alert('New Report clicked'), []);
  const handleQuickAdd       = useCallback((item) => alert(`Quick Add: ${item}`), []);
  const handleMetricClick    = useCallback((id) => alert(`Metric clicked: ${id}`), []);
  const handleViewActivities = useCallback(() => alert('View all activities'), []);
  const handleViewTasks      = useCallback(() => alert('View all tasks'), []);

  return (
    <div style={layout.root}>
      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={(nav) => {
          setActiveNav(nav);
          setSidebarOpen(false);
        }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main area — margin-left controlled by .main-content CSS class */}
      <div className="main-content">
        <Header
          onNewReport={handleNewReport}
          onQuickAdd={handleQuickAdd}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content area */}
        <div style={layout.content}>
          {activeNav === 'dashboard' && (
            <Dashboard
              adminName="Admin"
              // metrics={metricsFromAPI}            ← replace with API data
              // activities={activitiesFromAPI}       ← replace with API data
              // tasksCompleted={apiData.completed}   ← replace with API data
              // tasksRemaining={apiData.remaining}   ← replace with API data
              // loading={isLoading}
              onMetricClick={handleMetricClick}
              onViewAllActivities={handleViewActivities}
              onViewAllTasks={handleViewTasks}
              onNewReport={handleNewReport}
            />
          )}
          {activeNav !== 'dashboard' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '60vh',
              flexDirection: 'column',
              gap: 12,
              color: 'var(--color-text-secondary)',
            }}>
              <div style={{ fontSize: 40 }}>🚧</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text)' }}>
                {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}
              </div>
              <div style={{ fontSize: 14 }}>Module coming soon — wire your backend here</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
