import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username: string, password: string, remember: boolean) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post('https://dummyjson.com/auth/login', {
            username,
            password,
          });

          const token = response.data.token;
          set({ token, isAuthenticated: true, isLoading: false });

          if (!remember) {
            sessionStorage.setItem('token', token);
          }
        } catch (error) {
          set({ 
            error: 'Неверный логин или пароль', 
            isLoading: false,
            isAuthenticated: false 
          });
        }
      },

      logout: () => {
        set({ token: null, isAuthenticated: false });
        localStorage.removeItem('auth-storage');
        sessionStorage.removeItem('token');
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);