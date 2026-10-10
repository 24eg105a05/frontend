import React from 'react';
import { Warehouse, Sparkles, ThermometerSnowflake, ShieldCheck } from 'lucide-react';

export default function ChamberModel3D() {
  return (
    <div className="w-full h-80 rounded-3xl bg-slate-950 border-4 border-emerald-500 shadow-[0_16px_0_0_#064e3b,0_25px_35px_rgba(0,0,0,0.5)] p-6 relative overflow-hidden flex flex-col justify-between perspective-1000">
      
      {/* Header Tag */}
      <div className="flex items-center justify-between z-10">
        <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-black text-xs uppercase rounded-full backdrop-blur-md flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          3D Multi-Chamber Climate Vault
        </span>
        <span className="text-xs font-bold text-slate-400">Auto-Balancing: ON</span>
      </div>

      {/* 3D Animated Isometric Vault Display */}
      <div className="relative flex items-center justify-center flex-grow">
        <div className="w-48 h-36 relative animate-spin-3d">
          {/* Chamber 1: Deep Freeze */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/80 to-sky-400/80 rounded-2xl border-2 border-cyan-200 shadow-[0_0_25px_rgba(6,182,212,0.6)] backdrop-blur-md flex flex-col items-center justify-center text-white transform -translate-z-6 p-2">
            <ThermometerSnowflake className="w-8 h-8 text-cyan-100 animate-bounce" />
            <span className="font-black text-xs mt-1">Vault A (-2°C)</span>
            <span className="text-[10px] text-cyan-100">Potatoes & Apples</span>
          </div>

          {/* Chamber 2: Ambient Chill (Angled Layer) */}
          <div className="absolute inset-2 bg-gradient-to-br from-emerald-600/70 to-teal-400/70 rounded-2xl border-2 border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)] backdrop-blur-md flex flex-col items-center justify-center text-white transform translate-x-4 translate-y-3 -rotate-6 p-2">
            <Warehouse className="w-6 h-6 text-emerald-100" />
            <span className="font-black text-[11px] mt-1">Vault B (4°C)</span>
            <span className="text-[9px] text-emerald-100">Fresh Vegetables</span>
          </div>
        </div>
      </div>

      {/* Footer Status Indicators */}
      <div className="grid grid-cols-3 gap-2 z-10">
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-2 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Humidity</div>
          <div className="text-xs font-black text-emerald-400">92% RH</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-2 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Ethylene</div>
          <div className="text-xs font-black text-sky-400">0.02 ppm</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-2 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Integrity</div>
          <div className="text-xs font-black text-yellow-400">100% OK</div>
        </div>
      </div>

      {/* Background glow effects */}
      <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-44 h-44 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
    </div>
  );
}