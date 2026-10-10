import React from 'react';
import { Truck, Navigation, Fuel, ShieldCheck } from 'lucide-react';

export default function TruckModel3D() {
  return (
    <div className="w-full h-80 rounded-3xl bg-slate-950 border-4 border-amber-500 shadow-[0_16px_0_0_#b45309,0_25px_35px_rgba(0,0,0,0.5)] p-6 relative overflow-hidden flex flex-col justify-between perspective-1000">
      
      {/* Header Tag */}
      <div className="flex items-center justify-between z-10">
        <span className="px-3 py-1 bg-amber-500/20 border border-amber-400/40 text-amber-300 font-black text-xs uppercase rounded-full backdrop-blur-md flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-amber-400" />
          Reefer Transit Simulator
        </span>
        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> GPS Active
        </span>
      </div>

      {/* 3D Animated Reefer Truck */}
      <div className="relative flex items-center justify-center flex-grow">
        <div className="animate-float-3d w-56 h-32 relative">
          
          {/* Main Refrigerated Cargo Body */}
          <div className="absolute left-0 top-2 w-36 h-24 bg-gradient-to-r from-slate-100 to-slate-200 border-2 border-slate-300 rounded-xl shadow-[0_12px_24px_rgba(0,0,0,0.5)] flex flex-col justify-between p-2">
            <div className="flex justify-between items-center text-[10px] font-black text-slate-700">
              <span className="px-1.5 py-0.5 bg-emerald-500 text-white rounded">REEFER</span>
              <span className="text-cyan-600 font-black">2.4°C</span>
            </div>
            <div className="space-y-1">
              <div className="h-1 bg-slate-300 rounded w-full" />
              <div className="h-1 bg-slate-300 rounded w-3/4" />
            </div>
            <span className="text-[9px] font-bold text-slate-500">AgriCold Fleet #TRK-901</span>
          </div>

          {/* Cabin / Driver Section */}
          <div className="absolute right-4 top-6 w-16 h-20 bg-gradient-to-b from-amber-500 to-amber-600 border-2 border-amber-300 rounded-r-2xl shadow-[0_8px_16px_rgba(245,158,11,0.4)] p-1.5 flex flex-col justify-between">
            <div className="w-full h-7 bg-sky-300/80 rounded-md border border-sky-100 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_8px_#fde047] self-end" />
          </div>

          {/* Wheels with 3D Bevels */}
          <div className="absolute left-4 -bottom-1 w-7 h-7 rounded-full bg-slate-900 border-2 border-slate-600 shadow-[0_4px_0_#0f172a] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
          </div>
          <div className="absolute left-24 -bottom-1 w-7 h-7 rounded-full bg-slate-900 border-2 border-slate-600 shadow-[0_4px_0_#0f172a] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
          </div>
          <div className="absolute right-6 -bottom-1 w-7 h-7 rounded-full bg-slate-900 border-2 border-slate-600 shadow-[0_4px_0_#0f172a] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
          </div>
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="grid grid-cols-3 gap-2 z-10">
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-2 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Speed</div>
          <div className="text-xs font-black text-amber-400">62 km/h</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-2 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center justify-center gap-0.5">
            <Fuel className="w-2.5 h-2.5" /> Reefer Fuel
          </div>
          <div className="text-xs font-black text-emerald-400">84%</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-2 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center justify-center gap-0.5">
            <Navigation className="w-2.5 h-2.5" /> Route
          </div>
          <div className="text-xs font-black text-sky-400 truncate">Highway 44</div>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
    </div>
  );
}