import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Warehouse, LogIn, LogOut, ShieldCheck, User, Truck, Search, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Find Storage', path: '/farmer/search', icon: Search },
    { name: 'Fleet Tracker', path: '/logistics/track', icon: Truck },
    { name: 'Matrix Dashboard', path: '/owner/dashboard', icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 py-3 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b-4 border-emerald-500 shadow-[0_8px_0_0_#064e3b,0_12px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand 3D Badge */}
        <Link 
          to="/farmer/search" 
          className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-b from-emerald-500 to-teal-700 text-white font-black text-lg rounded-2xl border-2 border-emerald-300 shadow-[0_4px_0_0_#065f46] hover:-translate-y-0.5 transition-all"
        >
          <Warehouse className="w-5 h-5 drop-shadow" />
          <span className="tracking-wider">AgriCold <span className="text-yellow-300 text-xs px-1.5 py-0.5 bg-black/30 rounded-md">3D</span></span>
        </Link>

        {/* Center Nav Pills */}
        <nav className="hidden md:flex items-center gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-[0_4px_0_0_#047857] -translate-y-0.5'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 shadow-[0_3px_0_0_#0f172a]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border-2 border-slate-700 rounded-xl text-xs font-black text-slate-200 shadow-[0_3px_0_0_#0f172a]">
                {user.role === 'admin' ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ) : (
                  <User className="w-4 h-4 text-sky-400" />
                )}
                <span>{user.username}</span>
                <span className="text-[10px] uppercase px-1.5 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-700">
                  {user.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl border-2 border-rose-400 shadow-[0_4px_0_0_#9f1239] active:translate-y-1 active:shadow-[0_0px_0_0_#9f1239] transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs rounded-xl border-2 border-amber-200 shadow-[0_4px_0_0_#b45309] active:translate-y-1 active:shadow-[0_0px_0_0_#b45309] transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;