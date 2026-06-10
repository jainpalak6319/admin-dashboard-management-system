import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, UserCheck, Shield } from 'lucide-react';

const InitialUsers = [
  { id: 1, name: 'Palak Jain', email: 'palak.j@nexsphere.ai', phone: '+91 98765-43210', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Akash Sharma', email: 'akash.s@nexsphere.ai', phone: '+91 91234-56789', role: 'User', status: 'Active' },
  { id: 3, name: 'Ananya Gupta', email: 'ananya.g@nexsphere.ai', phone: '+91 99887-76655', role: 'User', status: 'Inactive' },
];

export default function NexSphereUserManagement() {
  const [users, setUsers] = useState(InitialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: 'User', status: 'Active' });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ ...user });
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', phone: '', role: 'User', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      setUsers([...users, { id: Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-[#0f172a] min-h-screen text-slate-200 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-400">
                <UserCheck size={28}/>
              </span>
              User Management
            </h1>
            <p className="text-slate-400 mt-2 text-lg">Central control for the NexSphere user ecosystem.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="group relative flex items-center gap-2 px-6 py-3 bg-cyan-500 text-[#0f172a] font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95"
          >
            <Plus size={20}/> Create New Entity
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative group max-w-xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors">
            <Search size={20}/>
          </div>
          <input
            type="text"
            placeholder="Scan users by identity or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-[#1e293b] border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all"
          />
        </div>

        {/* NexSphere Data Table */}
        <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1e293b] border-b border-slate-700 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <th className="py-5 px-8">Identity</th>
                  <th className="py-5 px-8">Communication</th>
                  <th className="py-5 px-8">Access Level</th>
                  <th className="py-5 px-8">Current State</th>
                  <th className="py-5 px-8 text-right">Directives</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-cyan-500/5 transition-colors group">
                    <td className="py-5 px-8">
                      <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{user.name}</div>
                      <div className="text-xs text-slate-500 mt-1 uppercase tracking-tighter font-mono">{user.phone}</div>
                    </td>
                    <td className="py-5 px-8 text-slate-400 font-mono text-sm">{user.email}</td>
                    <td className="py-5 px-8">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${
                        user.role === 'Admin' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-slate-700/50 text-slate-400 border-slate-600'
                      }`}>
                        {user.role === 'Admin' && <Shield size={12}/>}
                        {user.role}
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      <span className={`flex items-center gap-2 text-xs font-bold ${
                        user.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-5 px-8 text-right space-x-3">
                      <button onClick={() => openModal(user)} className="text-slate-500 hover:text-cyan-400 transition-colors"><Edit2 size={18}/></button>
                      <button onClick={() => setUsers(users.filter(u => u.id !== user.id))} className="text-slate-500 hover:text-rose-400 transition-colors"><Trash2 size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Glassmorphism Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-50 flex items-center justify-center p-6">
            <div className="bg-[#1e293b] w-full max-w-lg rounded-3xl border border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-700 flex justify-between items-center bg-[#1e293b]">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">{editingUser ? 'Update Entity' : 'Onboard User'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X/></button>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none" required />
                </div>
                {/* ... other inputs with same styling ... */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 border border-slate-700 text-slate-400 rounded-xl hover:bg-slate-800 transition">Abort</button>
                  <button type="submit" className="px-6 py-3 bg-cyan-500 text-[#0f172a] font-bold rounded-xl hover:bg-cyan-400 transition">Confirm Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}