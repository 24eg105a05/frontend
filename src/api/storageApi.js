import axiosClient from './axiosClient';

export const storageApi = {
  // Fetch real facilities seeded by backend DataInitializer
  getAllFacilities: async () => {
    const response = await axiosClient.get('/facilities');
    return response.data;
  },

  // Fetch existing bookings
  getAllBookings: async () => {
    const response = await axiosClient.get('/bookings');
    return response.data;
  },

  // Save new booking
  createBooking: async (bookingPayload) => {
    const response = await axiosClient.post('/bookings', bookingPayload);
    return response.data;
  },
};