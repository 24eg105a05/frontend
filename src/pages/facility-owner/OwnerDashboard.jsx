import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Truck, Warehouse, CheckCircle2, 
  TrendingUp, Users, RefreshCw, Layers, Sparkles, Box, PlusCircle
} from 'lucide-react';
import { storageApi } from '../../api/storageApi';
import ChamberModel3D from '../../components/3d/ChamberModel3D';
import TruckModel3D from '../../components/3d/TruckModel3D';

const OwnerDashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'cabin' | 'transporter'

  // Cabin Form State
  const [cabinData, setCabinData] = useState({
    facilityId: '',
    compartmentName: '',
    cropCompatibility: 'Potatoes, Apples, Chillies',
    minTemp: '0',
    maxTemp: '4',
    totalCapacityMt: '200',
    ratePerCrate: '12',
  });

  // Transporter Form State
  const [transporterData, setTransporterData] = useState({
    driverName: '',
    vehicleNumber: '',
    capacityMt: '10',
    route: 'Regional Hub Corridor',
  });

  const [fleetList, setFleetList] = useState([
    { id: 1, name: 'Srinivas Rao', vehicle: 'TS-09-UB-4421', capacity: '12 MT', status: 'Available' },
    { id: 2, name: 'Anil Kumar', vehicle: 'AP-29-TA-1890', capacity: '8 MT', status: 'In-Transit' },
  ]);

  const [notification, setNotification] = useState(null);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [facData, bookData] = await Promise.all([
        storageApi.getAllFacilities().catch(() => []),
        storageApi.getAllBookings().catch(() => [])
      ]);
      setFacilities(facData);
      setBookings(bookData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    await storageApi.updateBookingStatus(bookingId, newStatus);
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    setNotification(`Booking #${bookingId} status changed to ${newStatus}`);
  };

  const handleCreateCabin = (e) => {
    e.preventDefault();
    setNotification(`Cabin "${cabinData.compartmentName}" created successfully!`);
    setCabinData({ ...cabinData, compartmentName: '' });
  };

  const handleCreateTransporter = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      name: transporterData.driverName,
      vehicle: transporterData.vehicleNumber,
      capacity: `${transporterData.capacityMt} MT`,
      status: 'Available',
    };
    setFleetList([...fleetList, newEntry]);
    setNotification(`Transporter "${transporterData.driverName}" onboarded to active fleet!`);
    setTransporterData({ driverName: '', vehicleNumber: '', capacityMt: '10', route: 'Regional Hub Corridor' });
  };

  const totalCrates = bookings.reduce((sum, b) => sum + (Number(b.crates) || 0), 0);
  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.totalCost) || 0), 0);
  const scheduledPickups = bookings.filter((b) => b.needPickup).length;

  const filteredBookings = statusFilter === 'ALL' 
    ? bookings 
    : bookings.filter((b) => (b.status || 'CONFIRMED') === statusFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100/60 via-purple-50 to-emerald-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 3D Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-[0_12px_0_0_#065f46,0_20px_25px_-5px_rgba(0,0,0,0.3)] border-4 border-emerald-400/40">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black tracking-wider uppercase border border-white/30 text-emerald-100 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                AgriCold 3D Matrix Console
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-md">
                Admin & Operations Hub
              </h1>
              <p className="text-emerald-100 text-sm max-w-xl font-medium">
                Real-time tracking of cold chambers, compartment allocations, and scheduled fleet pickups.
              </p>
            </div>

            <button
              onClick={loadDashboardData}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl border-2 border-amber-200 shadow-[0_6px_0_0_#b45309,0_12px_16px_rgba(0,0,0,0.25)] active:translate-y-1.5 active:shadow-[0_0px_0_0_#b45309] transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Sync Matrix
            </button>
          </div>
        </div>

        {/* Tab Switcher: Overview / Add Cabin / Add Transporter */}
        <div className="flex flex-wrap gap-3">
          {[
            { id: 'overview', label: 'Dashboard & Schedules', icon: Layers },
            { id: 'cabin', label: 'Add Chamber / Cabin', icon: Box },
            { id: 'transporter', label: 'Onboard Transporter', icon: Truck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all border-2 ${
                  isActive
                    ? 'bg-slate-900 text-emerald-400 border-slate-700 shadow-[0_6px_0_0_#0f172a] -translate-y-0.5'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-300 shadow-[0_4px_0_0_#cbd5e1]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl flex items-center justify-between shadow-[0_4px_0_0_#059669]">
            <div className="flex items-center gap-3 text-emerald-950 text-xs font-black">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span>{notification}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-xs font-black text-emerald-800 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* TAB 1: OVERVIEW & SCHEDULES */}
        {activeTab === 'overview' && (
          <>
            {/* Interactive 3D Holographic Matrix Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChamberModel3D />
              <TruckModel3D />
            </div>

            {/* 4 3D KPI Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Emerald */}
              <div className="rounded-3xl bg-gradient-to-b from-emerald-500 to-emerald-600 p-6 text-white border-2 border-emerald-300/50 shadow-[0_10px_0_0_#065f46,0_16px_20px_rgba(5,150,105,0.3)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-100">Total Bookings</span>
                  <div className="p-3 bg-white/20 rounded-2xl border border-white/30 shadow-[0_3px_0_rgba(0,0,0,0.1)]">
                    <Warehouse className="w-6 h-6 text-emerald-100" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-4xl font-black">{bookings.length}</div>
                  <div className="text-xs font-bold text-emerald-100 mt-2 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" /> Active contracts
                  </div>
                </div>
              </div>

              {/* Card 2: Sky */}
              <div className="rounded-3xl bg-gradient-to-b from-sky-500 to-blue-600 p-6 text-white border-2 border-sky-300/50 shadow-[0_10px_0_0_#1d4ed8,0_16px_20px_rgba(37,99,235,0.3)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-sky-100">Reserved Crates</span>
                  <div className="p-3 bg-white/20 rounded-2xl border border-white/30 shadow-[0_3px_0_rgba(0,0,0,0.1)]">
                    <Users className="w-6 h-6 text-sky-100" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-4xl font-black">{totalCrates} <span className="text-sm font-bold text-sky-200">Crates</span></div>
                  <div className="text-xs font-bold text-sky-100 mt-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> In climate vaults
                  </div>
                </div>
              </div>

              {/* Card 3: Amber */}
              <div className="rounded-3xl bg-gradient-to-b from-amber-500 to-orange-600 p-6 text-white border-2 border-amber-300/50 shadow-[0_10px_0_0_#c2410c,0_16px_20px_rgba(234,88,12,0.3)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-100">Pickups Scheduled</span>
                  <div className="p-3 bg-white/20 rounded-2xl border border-white/30 shadow-[0_3px_0_rgba(0,0,0,0.1)]">
                    <Truck className="w-6 h-6 text-amber-100" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-4xl font-black">{scheduledPickups} <span className="text-sm font-bold text-amber-200">Trucks</span></div>
                  <div className="text-xs font-bold text-amber-100 mt-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Farmgate logistics
                  </div>
                </div>
              </div>

              {/* Card 4: Purple */}
              <div className="rounded-3xl bg-gradient-to-b from-purple-500 to-fuchsia-600 p-6 text-white border-2 border-purple-300/50 shadow-[0_10px_0_0_#701a75,0_16px_20px_rgba(162,28,175,0.3)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-purple-100">Gross Valuation</span>
                  <div className="p-3 bg-white/20 rounded-2xl border border-white/30 shadow-[0_3px_0_rgba(0,0,0,0.1)]">
                    <TrendingUp className="w-6 h-6 text-purple-100" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-4xl font-black">₹{totalRevenue.toLocaleString()}</div>
                  <div className="text-xs font-bold text-purple-100 mt-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Storage billing
                  </div>
                </div>
              </div>
            </div>

            {/* Timetable Section */}
            <div className="bg-white/90 rounded-3xl border-2 border-slate-200/80 shadow-[0_12px_0_0_#cbd5e1] overflow-hidden">
              <div className="p-6 bg-gradient-to-b from-slate-50 to-white border-b-2 border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl shadow-[0_3px_0_0_#a7f3d0]">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800">
                      Live Produce & Logistics Timetable
                    </h2>
                  </div>
                  <p className="text-xs font-bold text-slate-500 mt-1">
                    Scheduling table for incoming produce bookings and cold compartment dispatches.
                  </p>
                </div>

                {/* 3D Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-black">
                  {['ALL', 'CONFIRMED', 'SCHEDULED', 'IN_TRANSIT', 'COMPLETED'].map((filter) => {
                    const isActive = statusFilter === filter;
                    return (
                      <button
                        key={filter}
                        onClick={() => setStatusFilter(filter)}
                        className={`px-3.5 py-2 rounded-xl transition-all border ${
                          isActive
                            ? 'bg-slate-900 text-emerald-400 border-slate-700 shadow-[0_4px_0_0_#0f172a] -translate-y-0.5'
                            : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-300 shadow-[0_3px_0_0_#e2e8f0]'
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Table */}
              {filteredBookings.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-40 animate-bounce" />
                  <p className="font-bold text-sm">No reservations found in this schedule bracket.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100/70 text-slate-600 text-xs font-black uppercase tracking-wider border-b-2 border-slate-200">
                      <tr>
                        <th className="px-6 py-4">Booking Ref & Hub</th>
                        <th className="px-6 py-4">Reserved Crates</th>
                        <th className="px-6 py-4">Schedule Window</th>
                        <th className="px-6 py-4">Fleet Pickup</th>
                        <th className="px-6 py-4">Status Update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-100 font-medium text-slate-700">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-indigo-50/40 transition">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-xl bg-slate-900 text-emerald-400 font-black text-xs flex items-center justify-center shadow-[0_3px_0_0_#334155]">
                                #{b.id}
                              </span>
                              <div>
                                <div className="font-black text-slate-900">{b.facilityName || `Facility ${b.facilityId}`}</div>
                                <div className="text-xs font-bold text-emerald-600">₹{b.totalCost} total</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="inline-block px-3 py-1 bg-sky-100 text-sky-800 border border-sky-300 rounded-xl font-black text-xs shadow-[0_2px_0_0_#bae6fd]">
                              {b.crates} Crates
                            </span>
                            <div className="text-xs text-slate-500 font-bold mt-1">Duration: {b.durationDays || '7'} Days</div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="text-xs font-bold text-slate-800">
                              <span className="text-slate-400">Start:</span> {b.startDate || 'Immediate'}
                            </div>
                            <div className="text-xs font-bold text-slate-500 mt-0.5">
                              <span className="text-slate-400">End:</span> {b.endDate || 'Rolling'}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            {b.needPickup ? (
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold shadow-[0_2px_0_0_#fde68a]">
                                <Truck className="w-3.5 h-3.5 text-amber-700" />
                                <span>{b.pickupAddress || 'Farm-gate Pickup'}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400 font-bold">Self Delivery</span>
                            )}
                          </td>
                          <td className="px-6 py-5">
                            <select
                              value={b.status || 'CONFIRMED'}
                              onChange={(e) => handleStatusChange(b.id, e.target.value)}
                              className={`text-xs font-black px-3 py-2 rounded-xl border-2 outline-none transition shadow-[0_3px_0_0_rgba(0,0,0,0.1)] active:translate-y-0.5 ${
                                (b.status || 'CONFIRMED') === 'COMPLETED'
                                  ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                                  : (b.status || 'CONFIRMED') === 'IN_TRANSIT'
                                  ? 'bg-amber-100 text-amber-900 border-amber-400'
                                  : (b.status || 'CONFIRMED') === 'SCHEDULED'
                                  ? 'bg-purple-100 text-purple-900 border-purple-400'
                                  : 'bg-sky-100 text-sky-900 border-sky-400'
                              }`}
                            >
                              <option value="CONFIRMED">● CONFIRMED</option>
                              <option value="SCHEDULED">● SCHEDULED</option>
                              <option value="IN_TRANSIT">● IN_TRANSIT</option>
                              <option value="COMPLETED">● COMPLETED</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Chamber Capacity Status */}
            <div className="bg-white/90 rounded-3xl border-2 border-slate-200/80 p-6 sm:p-8 shadow-[0_12px_0_0_#cbd5e1] space-y-6">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Warehouse className="w-5 h-5 text-indigo-600" />
                Live Chamber Capacities & Microclimates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {facilities.map((fac) => (
                  <div 
                    key={fac.id} 
                    className="rounded-2xl border-2 border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-[0_8px_0_0_#e2e8f0] space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-black text-base text-slate-900">{fac.name}</h3>
                        <p className="text-xs font-bold text-slate-400">{fac.location}</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500 text-white font-black text-[11px] rounded-full shadow-[0_2px_0_0_#065f46]">
                        Active Vault
                      </span>
                    </div>

                    <div className="space-y-3">
                      {fac.compartments?.map((comp) => {
                        const pct = Math.min(100, Math.round(((comp.occupiedCapacityMt || 0) / (comp.totalCapacityMt || 1)) * 100));
                        return (
                          <div key={comp.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                            <div className="flex justify-between items-center text-xs font-black">
                              <span className="text-slate-800">{comp.compartmentName}</span>
                              <span className="px-2 py-0.5 rounded-lg bg-sky-100 text-sky-800 border border-sky-300">
                                {comp.minTemperature}°C to {comp.maxTemperature}°C
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 h-4 rounded-full p-0.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 transition-all duration-500"
                                style={{ width: `${Math.max(pct, 10)}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-[11px] font-bold text-slate-500">
                              <span>{comp.occupiedCapacityMt || 0} MT Occupied</span>
                              <span>{comp.totalCapacityMt} MT Capacity ({pct}%)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB 2: ADD STORAGE CABIN */}
        {activeTab === 'cabin' && (
          <div className="bg-white/90 rounded-3xl border-2 border-slate-200/80 p-8 shadow-[0_12px_0_0_#cbd5e1] max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl shadow-[0_4px_0_0_#a7f3d0]">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800">Add New Storage Cabin / Vault</h2>
                <p className="text-xs font-bold text-slate-500">Configure chamber temperature range, capacity, and pricing.</p>
              </div>
            </div>

            <form onSubmit={handleCreateCabin} className="space-y-4 text-xs font-bold">
              <div>
                <label className="text-slate-600 block mb-1">Select Facility</label>
                <select
                  value={cabinData.facilityId}
                  onChange={(e) => setCabinData({ ...cabinData, facilityId: e.target.value })}
                  className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none"
                >
                  <option value="">-- Choose Existing Hub --</option>
                  {facilities.map((f) => (
                    <option key={f.id} value={f.id}>{f.name} ({f.location})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-600 block mb-1">Cabin Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vault 3 - Deep Freeze"
                  value={cabinData.compartmentName}
                  onChange={(e) => setCabinData({ ...cabinData, compartmentName: e.target.value })}
                  className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-600 block mb-1">Min Temp (°C)</label>
                  <input
                    type="number"
                    value={cabinData.minTemp}
                    onChange={(e) => setCabinData({ ...cabinData, minTemp: e.target.value })}
                    className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Max Temp (°C)</label>
                  <input
                    type="number"
                    value={cabinData.maxTemp}
                    onChange={(e) => setCabinData({ ...cabinData, maxTemp: e.target.value })}
                    className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-600 block mb-1">Total Capacity (MT)</label>
                  <input
                    type="number"
                    value={cabinData.totalCapacityMt}
                    onChange={(e) => setCabinData({ ...cabinData, totalCapacityMt: e.target.value })}
                    className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Daily Rate (₹ / Crate)</label>
                  <input
                    type="number"
                    value={cabinData.ratePerCrate}
                    onChange={(e) => setCabinData({ ...cabinData, ratePerCrate: e.target.value })}
                    className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 rounded-2xl shadow-[0_6px_0_0_#065f46] active:translate-y-1 active:shadow-[0_0px_0_0_#065f46] transition-all text-sm mt-4 flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                Register Cabin to Database
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: ONBOARD TRANSPORTER */}
        {activeTab === 'transporter' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/90 rounded-3xl border-2 border-slate-200/80 p-8 shadow-[0_12px_0_0_#cbd5e1] space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl shadow-[0_4px_0_0_#fde68a]">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-800">Onboard Fleet Transporter</h2>
                  <p className="text-xs font-bold text-slate-500">Register refrigerated trucks for farmgate pickups.</p>
                </div>
              </div>

              <form onSubmit={handleCreateTransporter} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="text-slate-600 block mb-1">Transporter / Agency Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Transport Corp"
                    value={transporterData.driverName}
                    onChange={(e) => setTransporterData({ ...transporterData, driverName: e.target.value })}
                    className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-600 block mb-1">Vehicle Registration Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TS-08-AB-9876"
                    value={transporterData.vehicleNumber}
                    onChange={(e) => setTransporterData({ ...transporterData, vehicleNumber: e.target.value })}
                    className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-600 block mb-1">Payload Capacity (Metric Tons)</label>
                  <input
                    type="number"
                    value={transporterData.capacityMt}
                    onChange={(e) => setTransporterData({ ...transporterData, capacityMt: e.target.value })}
                    className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3.5 rounded-2xl shadow-[0_6px_0_0_#b45309] active:translate-y-1 active:shadow-[0_0px_0_0_#b45309] transition-all text-sm mt-4 flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  Onboard Transporter
                </button>
              </form>
            </div>

            {/* Fleet List */}
            <div className="bg-white/90 rounded-3xl border-2 border-slate-200/80 p-8 shadow-[0_12px_0_0_#cbd5e1] space-y-4">
              <h3 className="text-lg font-black text-slate-800">Active Transporter Fleet</h3>
              <div className="divide-y-2 divide-slate-100">
                {fleetList.map((t) => (
                  <div key={t.id} className="py-4 flex items-center justify-between">
                    <div>
                      <div className="font-black text-sm text-slate-900">{t.name}</div>
                      <div className="text-xs font-bold text-slate-500">
                        Vehicle: {t.vehicle} | Capacity: {t.capacity}
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-black shadow-[0_2px_0_0_#a7f3d0]">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default OwnerDashboard;