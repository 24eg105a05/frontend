import React, { useState } from 'react';
import { Truck, Thermometer, Navigation, Fuel, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

const FleetTracker = () => {
  const [vehicles] = useState([
    {
      id: 'TRK-901',
      driver: 'Ramesh Reddy',
      plate: 'TS-09-UB-4421',
      temp: '3.2°C',
      targetTemp: '2.0°C - 4.0°C',
      cargo: 'Tomatoes & Capsicum (320 crates)',
      route: 'Gajwel Farmgate → Metro Hub Vault 3',
      status: 'On Highway (64 km/h)',
      fuel: '74%',
      alert: false,
    },
    {
      id: 'TRK-408',
      driver: 'Balram Yadav',
      plate: 'AP-29-TA-1890',
      temp: '6.8°C',
      targetTemp: '0.0°C - 2.0°C',
      cargo: 'Apples & Strawberries (280 crates)',
      route: 'Khammam Orchards → Central Cold Storage',
      status: 'Docking & Loading',
      fuel: '48%',
      alert: true,
    },
    {
      id: 'TRK-112',
      driver: 'Kiran Goud',
      plate: 'TS-08-KL-7762',
      temp: '-1.4°C',
      targetTemp: '-2.0°C - 0.0°C',
      cargo: 'Frozen Peas & Carrots (450 crates)',
      route: 'Warangal Sub-Depot → AgriCold Vault 1',
      status: 'Dispatched (45 km/h)',
      fuel: '89%',
      alert: false,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100/60 via-purple-50 to-emerald-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 p-8 text-white shadow-[0_12px_0_0_#9a3412,0_20px_25px_-5px_rgba(0,0,0,0.3)] border-4 border-amber-300/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider mb-2 border border-white/30 text-amber-100 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]">
            <Truck className="w-3.5 h-3.5" />
            Refrigerated Transport Grid
          </div>
          <h1 className="text-3xl sm:text-4xl font-black drop-shadow-md">Live Fleet Logistics & Telematics</h1>
          <p className="text-amber-100 text-sm mt-1 max-w-xl font-medium">
            Active temperature telemetry, GPS corridors, and cold-integrity tracking across rural transit.
          </p>
        </div>

        {/* 3D Vehicle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className={`rounded-3xl border-2 p-6 bg-white/95 shadow-[0_10px_0_0_#cbd5e1] flex flex-col justify-between space-y-4 ${
                v.alert ? 'border-rose-400' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-slate-900 text-emerald-400 font-black text-xs rounded-xl shadow-[0_2px_0_0_#334155]">
                    {v.id}
                  </span>
                  {v.alert ? (
                    <span className="px-2.5 py-1 bg-rose-100 text-rose-800 border border-rose-300 font-black text-[11px] rounded-lg flex items-center gap-1 animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Temp Spike
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 font-black text-[11px] rounded-lg flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Optimal
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900">{v.plate}</h3>
                  <p className="text-xs font-bold text-slate-500">Driver: {v.driver}</p>
                </div>

                {/* Microclimate Telematics Box */}
                <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 space-y-2 text-xs font-bold text-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 text-slate-400 uppercase text-[10px]">
                      <Thermometer className="w-3.5 h-3.5 text-sky-500" /> Chamber Temp
                    </span>
                    <span className={`text-sm font-black ${v.alert ? 'text-rose-600 font-black' : 'text-emerald-700'}`}>
                      {v.temp}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span>Target Range:</span>
                    <span>{v.targetTemp}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span className="flex items-center gap-1"><Fuel className="w-3 h-3" /> Reefer Fuel:</span>
                    <span>{v.fuel}</span>
                  </div>
                </div>

                <div className="text-xs font-bold space-y-1 text-slate-600">
                  <p><span className="text-slate-400">Payload:</span> {v.cargo}</p>
                  <p className="flex items-start gap-1"><Navigation className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" /> {v.route}</p>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-slate-800">{v.status}</span>
                <button className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] rounded-xl border-2 border-slate-700 shadow-[0_3px_0_0_#0f172a] active:translate-y-0.5 transition-all">
                  Ping Driver
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FleetTracker;