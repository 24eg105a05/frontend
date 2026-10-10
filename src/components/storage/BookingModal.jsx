import React, { useState } from 'react';
import { X, Calendar, Truck, Box, CheckCircle } from 'lucide-react';

const BookingModal = ({ facility, onClose, onConfirm }) => {
  const [crates, setCrates] = useState(50);
  const [days, setDays] = useState(7);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [needPickup, setNeedPickup] = useState(false);
  const [pickupAddress, setPickupAddress] = useState('');

  // Daily rate extraction
  const ratePerCrate = 12;
  const storageCost = crates * days * ratePerCrate;
  const transportCost = needPickup ? 1500 : 0;
  const totalCost = storageCost + transportCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      facilityId: facility.id,
      facilityName: facility.name,
      crates: Number(crates),
      days: Number(days),
      startDate,
      endDate: startDate,
      needPickup,
      pickupAddress: needPickup ? pickupAddress : '',
      totalCost,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border-4 border-emerald-400 p-6 sm:p-8 shadow-[0_16px_0_0_#065f46,0_25px_50px_rgba(0,0,0,0.4)] animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 shadow-[0_2px_0_0_#cbd5e1]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-lg border border-emerald-300">
            Vault Reservation
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2">{facility.name}</h2>
          <p className="text-xs font-bold text-slate-500">{facility.location}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-600 block mb-1">Crates to Store</label>
              <input
                type="number"
                min="10"
                value={crates}
                onChange={(e) => setCrates(e.target.value)}
                className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none focus:border-emerald-500 shadow-inner"
              />
            </div>
            <div>
              <label className="text-slate-600 block mb-1">Duration (Days)</label>
              <input
                type="number"
                min="1"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none focus:border-emerald-500 shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-600 block mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border-2 border-slate-200 rounded-xl outline-none focus:border-emerald-500 shadow-inner"
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={needPickup}
                onChange={(e) => setNeedPickup(e.target.checked)}
                className="w-5 h-5 text-emerald-600 rounded border-2 border-slate-300"
              />
              <span className="text-slate-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600" />
                Schedule Farm-gate Reefer Pickup (+₹1,500)
              </span>
            </label>

            {needPickup && (
              <input
                type="text"
                required
                placeholder="Enter village, farm gate or landmark"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                className="w-full p-2.5 border-2 border-amber-300 bg-white rounded-xl outline-none text-xs"
              />
            )}
          </div>

          {/* 3D Pricing Breakdown */}
          <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white shadow-[0_4px_0_0_#065f46] space-y-1">
            <div className="flex justify-between text-emerald-100 text-xs">
              <span>Storage Fee ({crates} crates × {days} days):</span>
              <span>₹{storageCost}</span>
            </div>
            {needPickup && (
              <div className="flex justify-between text-emerald-100 text-xs">
                <span>Fleet Reefer Dispatch:</span>
                <span>₹{transportCost}</span>
              </div>
            )}
            <div className="pt-2 border-t border-emerald-400 flex justify-between text-base font-black">
              <span>Total Payable:</span>
              <span>₹{totalCost}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black rounded-2xl border-2 border-amber-200 shadow-[0_6px_0_0_#b45309] active:translate-y-1 active:shadow-[0_0px_0_0_#b45309] transition-all text-sm flex items-center justify-center gap-2 mt-4"
          >
            <CheckCircle className="w-5 h-5 text-slate-950" />
            Confirm 3D Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;