/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { setAuthToken } from '../services/apiClient';

const AuthContext = createContext(null);

const STORAGE_KEY_TOKEN = 'auth_token';
const STORAGE_KEY_USER = 'auth_user';

function loadFromStorage() {
  try {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    const user = raw ? JSON.parse(raw) : null;
    if (token) setAuthToken(token);
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadFromStorage().user);
  const [token, setToken] = useState(() => loadFromStorage().token);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  const login = useCallback((userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    if (authToken) {
      localStorage.setItem(STORAGE_KEY_TOKEN, authToken);
      setAuthToken(authToken);
    }
    if (userData) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userData));
    }
  }, []);

  const updateUser = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
  }, []);

  const isAuthenticated = useCallback(() => !!token, [token]);

  const isAdmin = useCallback(() => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return Array.isArray(user.roles) && user.roles.includes('admin');
  }, [user]);

  const hasRole = useCallback((role) => {
    if (!user) return false;
    if (user.role === role) return true;
    return Array.isArray(user.roles) && user.roles.includes(role);
  }, [user]);

  if (!initialized) return null;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, isAuthenticated, isAdmin, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export default AuthContext;
