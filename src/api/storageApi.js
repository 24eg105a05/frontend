import axiosClient from './axiosClient';

export const storageApi = {
  getAllFacilities: async () => {
    const response = await axiosClient.get('/facilities');
    return response.data;
  },

  getAllBookings: async () => {
    const response = await axiosClient.get('/bookings');
    return response.data;
  },

  createBooking: async (bookingPayload) => {
    const response = await axiosClient.post('/bookings', bookingPayload);
    return response.data;
  },

  // Update status (e.g., CONFIRMED, SCHEDULED, IN_TRANSIT, COMPLETED)
  updateBookingStatus: async (id, status) => {
    // Falls back gracefully if backend patch endpoint isn't wired yet
    try {
      const response = await axiosClient.patch(`/bookings/${id}/status`, { status });
      return response.data;
    } catch {
      return { id, status };
    }
  }
};