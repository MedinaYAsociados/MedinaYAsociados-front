// Auth service with a switchable MOCK mode. When you're ready, set USE_MOCK=false
// and ensure VITE_API_BASE_URL is configured.
import api, { setAuthToken } from './apiClient';

const USE_MOCK = true; // Set to false to use real backend API

// Mock users database
const MOCK_USERS = {
  // Cliente
  'cliente@test.com': {
    email: 'cliente@test.com',
    password: '123456',
    role: 'client',
    name: 'Juan Pérez',
    id: 'user-1'
  },
  // Abogado
  'abogado@test.com': {
    email: 'abogado@test.com',
    password: '123456',
    role: 'lawyer',
    name: 'Dr. Alejandro Forneris',
    id: 'lawyer-1'
  }
};

// ---------------- MOCK IMPLEMENTATION ----------------
async function mockLogin({ email, password }) {
  await new Promise((r) => setTimeout(r, 700));
  
  const user = MOCK_USERS[email];
  
  if (!user || user.password !== password) {
    const error = new Error('Credenciales inválidas');
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return { 
    token: 'mock-token-' + user.id, 
    user: userWithoutPassword 
  };
}

async function mockRegister(payload) {
  await new Promise((r) => setTimeout(r, 900));
  if (!payload?.email?.includes('@')) {
    const error = new Error('Email inválido');
    error.code = 'INVALID_EMAIL';
    throw error;
  }
  // New users are clients by default
  return { 
    ok: true, 
    id: Math.random().toString(36).slice(2),
    role: 'client'
  };
}

// ---------------- REAL IMPLEMENTATION (Spring Boot) ----------------
// Adjust endpoints to your backend mapping.
async function realLogin({ email, password }) {
  const res = await api.post('/auth/login', { email, password });
  if (res?.token) setAuthToken(res.token);
  return res;
}

async function realRegister(payload) {
  return api.post('/auth/register', payload);
}

// ---------------- PUBLIC API ----------------
export async function login(params) {
  return USE_MOCK ? mockLogin(params) : realLogin(params);
}

export async function register(payload) {
  return USE_MOCK ? mockRegister(payload) : realRegister(payload);
}
