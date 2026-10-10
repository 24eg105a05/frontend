import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import SearchHubs from './pages/farmer/SearchHubs';
import FleetTracker from './pages/transporter/FleetTracker';
import OwnerDashboard from './pages/facility-owner/OwnerDashboard';
import Login from './pages/auth/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="w-full min-h-screen bg-slate-50 flex flex-col font-sans">
          <Navbar />
          <main className="flex-grow w-full">
            <Routes>
              <Route path="/" element={<SearchHubs />} />
              <Route path="/farmer/search" element={<SearchHubs />} />
              <Route path="/logistics/track" element={<FleetTracker />} />
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;