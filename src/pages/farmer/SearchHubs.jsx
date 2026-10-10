import React, { useState, useEffect } from 'react';
import { ThermometerSnowflake, MapPin, CheckCircle2, AlertCircle, Loader2, Warehouse, Sparkles, Box } from 'lucide-react';
import BookingModal from '../../components/storage/BookingModal';
import { storageApi } from '../../api/storageApi';

const SearchHubs = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await storageApi.getAllFacilities();
      setFacilities(data);
    } catch (err) {
      console.error(err);
      setErrorMessage('Backend connection offline on port 8081.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingConfirm = async (bookingData) => {
    try {
      const payload = {
        facilityId: bookingData.facilityId,
        facilityName: bookingData.facilityName,
        crates: bookingData.crates,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        durationDays: bookingData.days,
        needPickup: bookingData.needPickup,
        pickupAddress: bookingData.pickupAddress,
        totalCost: bookingData.totalCost,
      };

      const saved = await storageApi.createBooking(payload);
      setConfirmedBooking(saved);
      setSelectedFacility(null);
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to reserve cold chamber.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100/60 via-purple-50 to-emerald-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 3D Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-[0_12px_0_0_#065f46,0_20px_25px_-5px_rgba(0,0,0,0.3)] border-4 border-emerald-400/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider mb-2 border border-white/30 text-emerald-100 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            Farmer Reservation Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black drop-shadow-md">Cold Storage Space Finder</h1>
          <p className="text-emerald-100 text-sm mt-1 max-w-xl font-medium">
            Lock in climate-controlled chambers for your harvest and schedule farmgate transport in real time.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 bg-rose-100 border-2 border-rose-400 rounded-2xl flex items-center gap-3 text-rose-950 font-black text-xs shadow-[0_4px_0_0_#9f1239]">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {confirmedBooking && (
          <div className="p-5 bg-emerald-100 border-2 border-emerald-400 rounded-2xl flex items-center justify-between shadow-[0_6px_0_0_#059669]">
            <div className="flex items-center gap-3 text-emerald-950 text-xs font-black">
              <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0" />
              <span>
                Booking #{confirmedBooking.id} confirmed! Reserved {confirmedBooking.crates} crates at {confirmedBooking.facilityName} (₹{confirmedBooking.totalCost}).
              </span>
            </div>
            <button 
              onClick={() => setConfirmedBooking(null)} 
              className="text-xs font-black text-emerald-800 hover:underline px-3 py-1 bg-white rounded-lg border border-emerald-300"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
            <p className="font-black text-sm">Querying active cold vaults...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((hub) => {
              const defaultComp = hub.compartments?.[0] || {};
              const price = defaultComp.dailyRatePerCrate ? `₹${defaultComp.dailyRatePerCrate} / Crate` : '₹12 / Crate';
              const tempRange = defaultComp.minTemperature !== undefined 
                ? `${defaultComp.minTemperature}°C to ${defaultComp.maxTemperature}°C`
                : '0°C to 4°C';

              return (
                <div 
                  key={hub.id} 
                  className="rounded-3xl border-2 border-slate-200/90 bg-white/95 p-6 shadow-[0_10px_0_0_#cbd5e1,0_16px_20px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:-translate-y-1 transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-2xl shadow-[0_3px_0_0_#a7f3d0]">
                          <Warehouse className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-black text-lg text-slate-900 leading-tight">{hub.name}</h3>
                          <p className="text-xs font-bold text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5" /> {hub.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 space-y-2 text-xs font-bold text-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 uppercase text-[10px]">Chamber Vault</span>
                        <span className="text-slate-900">{defaultComp.compartmentName || 'Chamber A'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 uppercase text-[10px]">Climate Range</span>
                        <span className="px-2 py-0.5 bg-sky-100 text-sky-800 border border-sky-300 rounded-lg flex items-center gap-1">
                          <ThermometerSnowflake className="w-3 h-3 text-sky-600" />
                          {tempRange}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 uppercase text-[10px]">Capacity</span>
                        <span className="text-slate-900">{defaultComp.totalCapacityMt || '500'} MT</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                        <span className="text-emerald-700 text-sm font-black">{price}</span>
                        <span className="text-[11px] text-slate-400">{defaultComp.cropCompatibility || 'Multi-produce'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedFacility({ ...hub, pricePerDay: price })}
                    className="mt-6 w-full py-3.5 bg-gradient-to-b from-slate-900 to-slate-950 hover:from-slate-800 text-emerald-400 font-black rounded-2xl border-2 border-slate-700 shadow-[0_6px_0_0_#0f172a] active:translate-y-1.5 active:shadow-[0_0px_0_0_#0f172a] transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Box className="w-4 h-4 text-emerald-400" />
                    Reserve Storage Vault
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {selectedFacility && (
          <BookingModal
            facility={selectedFacility}
            onClose={() => setSelectedFacility(null)}
            onConfirm={handleBookingConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default SearchHubs;