import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, User, CheckCircle2, Sparkles, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const finalUser = username.trim() || (role === 'admin' ? 'Facility Admin' : 'Demo User');
    login(role, finalUser);

    if (role === 'admin' || role === 'owner') {
      navigate('/owner/dashboard');
    } else if (role === 'transporter') {
      navigate('/logistics/track');
    } else {
      navigate('/farmer/search');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-indigo-100/60 via-purple-50 to-emerald-50/60 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl border-4 border-emerald-400 p-8 shadow-[0_16px_0_0_#065f46,0_25px_35px_rgba(0,0,0,0.15)] space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-emerald-800 shadow-[0_4px_0_0_#a7f3d0]">
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Access AgriCold 3D</h2>
          <p className="text-xs font-bold text-slate-500">Sign in with role-based access control</p>
        </div>

        {/* 3D Role Tabs */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">Select Your Role</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'admin', label: 'Admin / Owner' },
              { id: 'farmer', label: 'Farmer' },
              { id: 'transporter', label: 'Fleet Driver' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRole(tab.id)}
                className={`py-2.5 text-xs font-black rounded-xl border-2 transition-all ${
                  role === tab.id
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-[0_4px_0_0_#059669] -translate-y-0.5'
                    : 'border-slate-200 text-slate-500 hover:bg-slate-50 shadow-[0_2px_0_0_#cbd5e1]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs font-bold">
          <div>
            <label className="text-slate-600 block mb-1">Username / Identifier</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Ramesh Reddy or Admin"
                className="w-full pl-9 pr-3 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-emerald-500 shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-600 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-emerald-500 shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black rounded-2xl border-2 border-amber-200 shadow-[0_6px_0_0_#b45309] active:translate-y-1 active:shadow-[0_0px_0_0_#b45309] transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
          >
            <CheckCircle2 className="w-5 h-5 text-slate-950" />
            Continue as {role.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;