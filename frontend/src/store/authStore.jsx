import {create} from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  // Initial state
  user: null,
  error: null,
  isLoading: false,

  // Signup action
  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:30084/signup",
        userData
      );
      set({
        user: response.data.user,
        isLoading: false,
        error: null,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.error || "Signup failed",
        isLoading: false,
      });
      throw error;
    }
  },

  // Login action
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:30084/login",
        credentials
      );
      set({
        user: response.data.user,
        isLoading: false,
        error: null,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
      throw error;
    }
  },

  // Logout action
  logout: () => {
    set({ user: null, error: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;
