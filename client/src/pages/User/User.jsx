import React, { useState, useMemo } from 'react';

// ── Icons ─────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}
function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/>
      <path d="M19 11a3 3 0 1 0 0-6"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    </svg>
  );
}
function ChevronIcon({ dir = 'down' }) {
  const rotate = { up: 180, down: 0, left: 90, right: -90 }[dir];
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      style={{ transform: `rotate(${rotate}deg)`, transition: 'transform 0.2s' }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}
function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  );
}
function AlertIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <triangle/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}

// ── Sample Data ───────────────────────────────────────────────
const INITIAL_USERS = [
  { id: 1,  name: 'Sarah Kimani',    email: 'sarah.k@nexsphere.io',   phone: '+1 (555) 012-3456', role: 'Admin',  status: 'Active'   },
  { id: 2,  name: 'Mike Johnson',    email: 'mike.j@nexsphere.io',    phone: '+1 (555) 234-5678', role: 'User',   status: 'Active'   },
  { id: 3,  name: 'Priya Sharma',    email: 'priya.s@nexsphere.io',   phone: '+1 (555) 345-6789', role: 'User',   status: 'Inactive' },
  { id: 4,  name: 'Carlos Mendez',   email: 'carlos.m@nexsphere.io',  phone: '+1 (555) 456-7890', role: 'Admin',  status: 'Active'   },
  { id: 5,  name: 'Aisha Okonkwo',   email: 'aisha.o@nexsphere.io',   phone: '+1 (555) 567-8901', role: 'User',   status: 'Active'   },
  { id: 6,  name: 'Tom Eriksson',    email: 'tom.e@nexsphere.io',     phone: '+1 (555) 678-9012', role: 'User',   status: 'Inactive' },
  { id: 7,  name: 'Yuki Tanaka',     email: 'yuki.t@nexsphere.io',    phone: '+1 (555) 789-0123', role: 'User',   status: 'Active'   },
  { id: 8,  name: 'Fatima Al-Zahra', email: 'fatima.a@nexsphere.io',  phone: '+1 (555) 890-1234', role: 'Admin',  status: 'Active'   },
];

const EMPTY_FORM = { name: '', email: '', phone: '', role: 'User', status: 'Active' };

// ── Avatar initials helper ────────────────────────────────────
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// Consistent avatar color per user based on name
const AVATAR_COLORS = [
  '#0F766E', '#0D9488', '#0891B2', '#7C3AED', '#BE185D',
  '#B45309', '#15803D', '#1D4ED8',
];
function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ── Sub-components ────────────────────────────────────────────

function StatCard({ label, value, sublabel, accent }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-card)',
      padding: '18px 22px',
      boxShadow: 'var(--shadow-card)',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      borderTop: `3px solid ${accent}`,
    }}>
      <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--color-text)', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{label}</div>
      <div style={{ fontSize: 11, color: 'var(--color-text-light)' }}>{sublabel}</div>
    </div>
  );
}

function Badge({ type }) {
  const styles = {
    Active:   { background: 'rgba(15,118,110,0.1)',  color: '#0F766E', border: '1px solid rgba(15,118,110,0.2)'  },
    Inactive: { background: 'rgba(156,163,175,0.15)', color: '#6B7280', border: '1px solid rgba(156,163,175,0.3)' },
    Admin:    { background: 'rgba(124,58,237,0.1)',  color: '#7C3AED', border: '1px solid rgba(124,58,237,0.2)'  },
    User:     { background: 'rgba(14,165,233,0.1)',  color: '#0369A1', border: '1px solid rgba(14,165,233,0.2)'  },
  };
  const st = styles[type] || styles.User;
  return (
    <span style={{
      ...st,
      fontSize: 11,
      fontWeight: 600,
      padding: '3px 10px',
      borderRadius: 99,
      letterSpacing: '0.03em',
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
    }}>
      {(type === 'Active') && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#0F766E', display: 'inline-block' }} />}
      {(type === 'Inactive') && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#9CA3AF', display: 'inline-block' }} />}
      {type}
    </span>
  );
}

// ── Modal ─────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(17,24,39,0.55)', backdropFilter: 'blur(2px)' }}
      />
      {/* Panel */}
      <div style={{
        position: 'relative',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: '0 24px 60px rgba(17,24,39,0.2)',
        width: '100%',
        maxWidth: 500,
        maxHeight: '90vh',
        overflowY: 'auto',
        border: '1px solid var(--color-border)',
      }}>
        {/* Modal header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px 16px',
          borderBottom: '1px solid var(--color-border)',
          position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 1,
          borderRadius: 'var(--radius-card) var(--radius-card) 0 0',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)' }}>{title}</div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-text-light)', padding: 4, borderRadius: 6,
            display: 'flex', alignItems: 'center',
          }}>
            <CloseIcon />
          </button>
        </div>
        <div style={{ padding: '20px 24px 24px' }}>{children}</div>
      </div>
    </div>
  );
}

// ── User Form ─────────────────────────────────────────────────
function UserForm({ initial = EMPTY_FORM, onSubmit, onCancel, submitLabel = 'Save User' }) {
  const [form, setForm] = useState({ ...initial });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim())  e.name  = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    onSubmit(form);
  }

  const field = (label, key, type = 'text', placeholder = '') => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6, letterSpacing: '0.02em' }}>
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        placeholder={placeholder}
        onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: '' })); }}
        style={{
          width: '100%',
          padding: '9px 12px',
          borderRadius: 'var(--radius-sm)',
          border: `1px solid ${errors[key] ? '#EF4444' : 'var(--color-border)'}`,
          background: errors[key] ? 'rgba(239,68,68,0.04)' : 'var(--bg-main)',
          fontSize: 13,
          color: 'var(--color-text)',
          fontFamily: 'var(--font-sans)',
          outline: 'none',
          transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
        onBlur={e => e.target.style.borderColor = errors[key] ? '#EF4444' : 'var(--color-border)'}
      />
      {errors[key] && <div style={{ fontSize: 11, color: '#EF4444', marginTop: 4 }}>{errors[key]}</div>}
    </div>
  );

  const select = (label, key, options) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text)', marginBottom: 6, letterSpacing: '0.02em' }}>
        {label}
      </label>
      <select
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        style={{
          width: '100%',
          padding: '9px 12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border)',
          background: 'var(--bg-main)',
          fontSize: 13,
          color: 'var(--color-text)',
          fontFamily: 'var(--font-sans)',
          outline: 'none',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' strokeWidth='2.5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: 32,
        }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <div style={{ gridColumn: '1 / -1' }}>{field('Full Name', 'name', 'text', 'e.g. Sarah Kimani')}</div>
        <div style={{ gridColumn: '1 / -1' }}>{field('Email Address', 'email', 'email', 'e.g. sarah@company.io')}</div>
        <div style={{ gridColumn: '1 / -1' }}>{field('Phone Number', 'phone', 'text', 'e.g. +1 (555) 000-0000')}</div>
        <div>{select('Role', 'role', ['Admin', 'User'])}</div>
        <div>{select('Status', 'status', ['Active', 'Inactive'])}</div>
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8, paddingTop: 16, borderTop: '1px solid var(--color-border)' }}>
        <button type="button" onClick={onCancel} style={{
          padding: '9px 18px', borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border)', background: 'var(--bg-card)',
          color: 'var(--color-text)', fontSize: 13, fontWeight: 500,
          cursor: 'pointer', fontFamily: 'var(--font-sans)',
        }}>
          Cancel
        </button>
        <button type="submit" style={{
          padding: '9px 20px', borderRadius: 'var(--radius-sm)',
          border: 'none', background: 'var(--color-primary)',
          color: '#fff', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'var(--font-sans)',
        }}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

// ── Delete Confirm ────────────────────────────────────────────
function DeleteConfirm({ user, onConfirm, onCancel }) {
  return (
    <div style={{ textAlign: 'center', padding: '8px 0' }}>
      <div style={{
        width: 52, height: 52, borderRadius: '50%',
        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px', color: '#EF4444',
      }}>
        <TrashIcon />
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8 }}>
        Delete {user.name}?
      </div>
      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
        This action cannot be undone. The user and all associated data will be permanently removed.
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button onClick={onCancel} style={{
          padding: '9px 20px', borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border)', background: 'var(--bg-card)',
          color: 'var(--color-text)', fontSize: 13, fontWeight: 500,
          cursor: 'pointer', fontFamily: 'var(--font-sans)',
        }}>
          Cancel
        </button>
        <button onClick={onConfirm} style={{
          padding: '9px 20px', borderRadius: 'var(--radius-sm)',
          border: 'none', background: '#EF4444',
          color: '#fff', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'var(--font-sans)',
        }}>
          Delete User
        </button>
      </div>
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  React.useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);

  const colors = {
    success: { bg: '#0F766E', icon: '✓' },
    error:   { bg: '#EF4444', icon: '✕' },
  };
  const c = colors[type] || colors.success;

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 400,
      background: c.bg, color: '#fff',
      padding: '12px 18px', borderRadius: 'var(--radius-sm)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
      display: 'flex', alignItems: 'center', gap: 10,
      fontSize: 13, fontWeight: 500,
      animation: 'slideUp 0.25s ease',
      maxWidth: 320,
    }}>
      <span style={{ fontSize: 16, fontWeight: 700 }}>{c.icon}</span>
      {message}
    </div>
  );
}

// ── Mobile User Card (shown instead of table row on small screens) ─
function UserCard({ user, onEdit, onDelete }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-card)',
      padding: '16px',
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 11,
          background: avatarColor(user.name),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0,
        }}>
          {getInitials(user.name)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.email}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Badge type={user.status} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Badge type={user.role} />
          <span style={{ fontSize: 12, color: 'var(--color-text-light)' }}>{user.phone}</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => onEdit(user)} style={{
            padding: '6px 12px', borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--color-border)', background: 'var(--bg-card)',
            color: 'var(--color-text)', fontSize: 12, fontWeight: 500,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'var(--font-sans)',
          }}>
            <EditIcon /> Edit
          </button>
          <button onClick={() => onDelete(user)} style={{
            padding: '6px 10px', borderRadius: 'var(--radius-xs)',
            border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.06)',
            color: '#EF4444', fontSize: 12, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'var(--font-sans)',
          }}>
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function Users() {
  const [users, setUsers]           = useState(INITIAL_USERS);
  const [search, setSearch]         = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [modal, setModal]           = useState(null); // null | 'add' | 'edit' | 'delete'
  const [selected, setSelected]     = useState(null);
  const [toast, setToast]           = useState(null);
  const [sortKey, setSortKey]       = useState('name');
  const [sortDir, setSortDir]       = useState('asc');

  // ── Derived stats ───────────────────────────────────────────
  const totalUsers    = users.length;
  const activeUsers   = users.filter(u => u.status === 'Active').length;
  const adminUsers    = users.filter(u => u.role === 'Admin').length;
  const inactiveUsers = users.filter(u => u.status === 'Inactive').length;

  // ── Filtered & sorted list ──────────────────────────────────
  const filtered = useMemo(() => {
    let list = users.filter(u => {
      const q = search.toLowerCase();
      const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchRole   = filterRole   === 'All' || u.role   === filterRole;
      const matchStatus = filterStatus === 'All' || u.status === filterStatus;
      return matchSearch && matchRole && matchStatus;
    });
    list = [...list].sort((a, b) => {
      const av = a[sortKey]?.toLowerCase?.() ?? '';
      const bv = b[sortKey]?.toLowerCase?.() ?? '';
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return list;
  }, [users, search, filterRole, filterStatus, sortKey, sortDir]);

  function showToast(message, type = 'success') {
    setToast({ message, type });
  }

  function handleSort(key) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  }

  function handleAdd(form) {
    setUsers(us => [...us, { ...form, id: Date.now() }]);
    setModal(null);
    showToast(`${form.name} added successfully`);
  }

  function handleEdit(form) {
    setUsers(us => us.map(u => u.id === selected.id ? { ...u, ...form } : u));
    setModal(null);
    setSelected(null);
    showToast(`${form.name} updated successfully`);
  }

  function handleDelete() {
    setUsers(us => us.filter(u => u.id !== selected.id));
    setModal(null);
    showToast(`${selected.name} removed`, 'error');
    setSelected(null);
  }

  const SortHeader = ({ label, k }) => (
    <th
      onClick={() => handleSort(k)}
      style={{
        padding: '12px 16px', textAlign: 'left', fontSize: 11,
        fontWeight: 600, color: 'var(--color-text-light)',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none',
        borderBottom: '1px solid var(--color-border)',
        background: '#F9FAFB',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        {label}
        {sortKey === k
          ? <ChevronIcon dir={sortDir === 'asc' ? 'up' : 'down'} />
          : <span style={{ opacity: 0.3 }}><ChevronIcon /></span>
        }
      </span>
    </th>
  );

  return (
    <div className="users-page">
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .users-page { padding: 28px; width: 100%; max-width: 100%; }
        .users-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        .users-toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
        .users-search-wrap { flex: 1; min-width: 200px; position: relative; }
        .users-filters { display: flex; gap: 8px; flex-wrap: wrap; }
        .users-table-wrap { overflow-x: auto; border-radius: var(--radius-card); border: 1px solid var(--color-border); box-shadow: var(--shadow-card); }
        .users-table { width: 100%; border-collapse: collapse; background: var(--bg-card); }
        .users-table tbody tr { transition: background 0.12s; cursor: default; }
        .users-table tbody tr:hover { background: var(--bg-card-hover); }
        .users-table tbody tr:last-child td { border-bottom: none; }
        .users-mobile-list { display: none; flex-direction: column; gap: 10px; }
        .action-btn { padding: 6px 12px; border-radius: var(--radius-xs); font-size: 12px; font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: all 0.15s; font-family: var(--font-sans); border: 1px solid var(--color-border); background: var(--bg-card); color: var(--color-text); }
        .action-btn:hover { background: var(--bg-accent-light); border-color: var(--color-primary); color: var(--color-primary); }
        .action-btn-danger { border-color: rgba(239,68,68,0.25) !important; background: rgba(239,68,68,0.06) !important; color: #EF4444 !important; }
        .action-btn-danger:hover { background: rgba(239,68,68,0.12) !important; }
        .filter-select { padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); background: var(--bg-card); font-size: 13px; color: var(--color-text); font-family: var(--font-sans); cursor: pointer; outline: none; }
        .filter-select:focus { border-color: var(--color-primary); }

        @media (max-width: 1024px) {
          .users-stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .users-page { padding: 16px; }
          .users-stats { grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px; }
          .users-toolbar { gap: 8px; }
          .users-search-wrap { min-width: 0; width: 100%; flex: unset; }
          .users-filters { width: 100%; }
          .users-table-wrap { display: none; }
          .users-mobile-list { display: flex; }
        }
        @media (max-width: 480px) {
          .users-stats { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .users-page { padding: 12px; }
        }
      `}</style>

      {/* ── Page header ─────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 12, flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: 'linear-gradient(135deg, #0F766E, #14B8A6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', flexShrink: 0,
            }}>
              <UsersIcon />
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', fontFamily: 'var(--font-serif)', margin: 0, lineHeight: 1.2 }}>
              User Management
            </h1>
          </div>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0, marginLeft: 44 }}>
            Manage platform users, roles, and access
          </p>
        </div>

        <button
          onClick={() => setModal('add')}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '10px 18px', borderRadius: 'var(--radius-sm)',
            border: 'none', background: 'var(--color-primary)',
            color: '#fff', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'var(--font-sans)',
            boxShadow: '0 2px 8px rgba(15,118,110,0.3)',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}
        >
          <PlusIcon /> Add User
        </button>
      </div>

      {/* ── Stat cards ──────────────────────────────────── */}
      <div className="users-stats">
        <StatCard label="Total Users"    value={totalUsers}    sublabel="All registered"       accent="#0F766E" />
        <StatCard label="Active"         value={activeUsers}   sublabel="Currently active"     accent="#14B8A6" />
        <StatCard label="Admins"         value={adminUsers}    sublabel="With admin access"    accent="#7C3AED" />
        <StatCard label="Inactive"       value={inactiveUsers} sublabel="Disabled accounts"    accent="#9CA3AF" />
      </div>

      {/* ── Table card ──────────────────────────────────── */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
      }}>
        {/* Toolbar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
          <div className="users-toolbar">
            {/* Search */}
            <div className="users-search-wrap">
              <span style={{
                position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)',
                color: 'var(--color-text-light)', display: 'flex', pointerEvents: 'none',
              }}>
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search by name or email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%', padding: '9px 12px 9px 34px',
                  borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)',
                  background: 'var(--bg-main)', fontSize: 13,
                  color: 'var(--color-text)', fontFamily: 'var(--font-sans)', outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>

            {/* Filters */}
            <div className="users-filters">
              <select className="filter-select" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Result count */}
            <span style={{ fontSize: 12, color: 'var(--color-text-light)', whiteSpace: 'nowrap', marginLeft: 'auto' }}>
              {filtered.length} of {users.length} users
            </span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="users-table-wrap" style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}>
          <table className="users-table">
            <thead>
              <tr>
                <SortHeader label="User"   k="name"   />
                <SortHeader label="Email"  k="email"  />
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--color-text-light)', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid var(--color-border)', background: '#F9FAFB', whiteSpace: 'nowrap' }}>Phone</th>
                <SortHeader label="Role"   k="role"   />
                <SortHeader label="Status" k="status" />
                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: 11, fontWeight: 600, color: 'var(--color-text-light)', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid var(--color-border)', background: '#F9FAFB' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '48px 16px', textAlign: 'center', color: 'var(--color-text-light)', fontSize: 13 }}>
                    <div style={{ marginBottom: 8, fontSize: 28 }}>🔍</div>
                    No users match your search.
                    {search && <span style={{ color: 'var(--color-primary)', cursor: 'pointer', marginLeft: 6 }} onClick={() => setSearch('')}>Clear search</span>}
                  </td>
                </tr>
              ) : filtered.map(user => (
                <tr key={user.id}>
                  {/* User */}
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: avatarColor(user.name),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0,
                      }}>
                        {getInitials(user.name)}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>
                        {user.name}
                      </span>
                    </div>
                  </td>
                  {/* Email */}
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)', fontSize: 13, color: 'var(--color-text-secondary)' }}>
                    {user.email}
                  </td>
                  {/* Phone */}
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)', fontSize: 13, color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                    {user.phone}
                  </td>
                  {/* Role */}
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)' }}>
                    <Badge type={user.role} />
                  </td>
                  {/* Status */}
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)' }}>
                    <Badge type={user.status} />
                  </td>
                  {/* Actions */}
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button className="action-btn" onClick={() => { setSelected(user); setModal('edit'); }}>
                      <EditIcon /> Edit
                    </button>
                    <button className="action-btn action-btn-danger" style={{ marginLeft: 6 }} onClick={() => { setSelected(user); setModal('delete'); }}>
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="users-mobile-list" style={{ padding: '12px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--color-text-light)', fontSize: 13 }}>
              <div style={{ marginBottom: 8, fontSize: 28 }}>🔍</div>
              No users match your search.
            </div>
          ) : filtered.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={u => { setSelected(u); setModal('edit'); }}
              onDelete={u => { setSelected(u); setModal('delete'); }}
            />
          ))}
        </div>

        {/* Table footer */}
        {filtered.length > 0 && (
          <div style={{
            padding: '12px 20px', borderTop: '1px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: '#FAFAFA', flexWrap: 'wrap', gap: 8,
          }}>
            <span style={{ fontSize: 12, color: 'var(--color-text-light)' }}>
              Showing <strong style={{ color: 'var(--color-text)' }}>{filtered.length}</strong> user{filtered.length !== 1 ? 's' : ''}
            </span>
            <span style={{ fontSize: 12, color: 'var(--color-text-light)' }}>
              {activeUsers} active · {inactiveUsers} inactive
            </span>
          </div>
        )}
      </div>

      {/* ── Modals ──────────────────────────────────────── */}
      {modal === 'add' && (
        <Modal title="Add New User" onClose={() => setModal(null)}>
          <UserForm onSubmit={handleAdd} onCancel={() => setModal(null)} submitLabel="Add User" />
        </Modal>
      )}

      {modal === 'edit' && selected && (
        <Modal title="Edit User" onClose={() => { setModal(null); setSelected(null); }}>
          <UserForm
            initial={selected}
            onSubmit={handleEdit}
            onCancel={() => { setModal(null); setSelected(null); }}
            submitLabel="Save Changes"
          />
        </Modal>
      )}

      {modal === 'delete' && selected && (
        <Modal title="Confirm Deletion" onClose={() => { setModal(null); setSelected(null); }}>
          <DeleteConfirm
            user={selected}
            onConfirm={handleDelete}
            onCancel={() => { setModal(null); setSelected(null); }}
          />
        </Modal>
      )}

      {/* ── Toast ───────────────────────────────────────── */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
