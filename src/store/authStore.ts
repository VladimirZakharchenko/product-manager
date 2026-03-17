// src/store/authStore.ts
import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkSession: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
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

      if (remember) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_remember', 'true');
      } else {
        sessionStorage.setItem('auth_token', token);
        sessionStorage.removeItem('auth_remember');
        localStorage.removeItem('auth_token');
      }

      set({ token, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Неверный логин или пароль', 
        isLoading: false,
        isAuthenticated: false 
      });
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_remember');
    sessionStorage.removeItem('auth_token');
    
    set({ token: null, isAuthenticated: false });
  },

  clearError: () => set({ error: null }),

  checkSession: () => {
    const localToken = localStorage.getItem('auth_token');
    const sessionToken = sessionStorage.getItem('auth_token');
    const remember = localStorage.getItem('auth_remember') === 'true';

    if (localToken && remember) {
      set({ token: localToken, isAuthenticated: true });
    } else if (sessionToken) {
      set({ token: sessionToken, isAuthenticated: true });
    } else {
      set({ token: null, isAuthenticated: false });
    }
  },
}));