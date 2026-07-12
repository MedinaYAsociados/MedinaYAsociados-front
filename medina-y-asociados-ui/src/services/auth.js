// Auth service
import api, { setAuthToken } from './apiClient';

const USE_MOCK = false; // Set to true to use mock users for testing without backend

// Limpiar tokens mock legacy de sesiones anteriores con USE_MOCK=true
if (!USE_MOCK) {
  try {
    const stored = localStorage.getItem('auth_token');
    if (stored && stored.startsWith('mock-')) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  } catch { /* noop */ }
}

// Mock users database
const MOCK_USERS = {
  // Cliente
  'cliente@test.com': {
    idUsuario: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    dni: '12345678',
    telefono: '3534234567',
    email: 'cliente@test.com',
    password: '123456',
    role: 'client',
    name: 'Juan Pérez',
    id: 'user-1',
    direccion: {
      idDireccion: 1,
      calle: 'San Martín',
      numeroCalle: 321,
      localidad: 1,
      provincia: 'Córdoba'
    },
    localidad: {
      idLocalidad: 1,
      nombreLocalidad: 'CAPITAL',
      codigoPostal: '5000'
    },
    turnosPorEstado: [
      { nombre: 'CONFIRMADO', cantidad: 2 },
      { nombre: 'COMPLETADO', cantidad: 5 },
      { nombre: 'CANCELADO', cantidad: 1 },
      { nombre: 'EXPIRO_PAGO', cantidad: 0 }
    ]
  },
  // Abogado
  'abogado@test.com': {
    email: 'abogado@test.com',
    password: '123456',
    role: 'lawyer',
    name: 'Dr. Alejandro Forneris',
    id: 'lawyer-1'
  },
  // Admin (también es abogado — prueba de múltiples roles)
  'admin@test.com': {
    email: 'admin@test.com',
    password: '123456',
    roles: ['admin', 'lawyer'],
    role: 'admin',
    name: 'Administrador',
    id: 'admin-1'
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
  if (!userWithoutPassword.roles) {
    userWithoutPassword.roles = [userWithoutPassword.role];
  }
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
const ROLE_MAP = { CLIENTE: 'client', ABOGADO: 'lawyer', ADMIN: 'admin' };

function mapRoles(roles) {
  return (roles || []).map(r => ROLE_MAP[r] || r.toLowerCase());
}

async function realLogin({ email, password }) {
  const res = await api.post('/auth/login', { email, password });
  if (res?.token) setAuthToken(res.token);

  const backendUser = res.user || {};
  const mappedRoles = mapRoles(res.roles);

  const user = {
    idUsuario: backendUser.idUsuario,
    nombre: backendUser.nombre || '',
    apellido: backendUser.apellido || '',
    name: `${backendUser.nombre || ''} ${backendUser.apellido || ''}`.trim() || email.split('@')[0],
    email: backendUser.email || email,
    roles: mappedRoles,
    role: mappedRoles[0] || '',
  };

  return { token: res.token, user };
}

async function realRegister(payload) {
  return api.post('/auth/register', payload);
}

async function realLogout() {
  try {
    await api.post('/auth/logout');
  } catch {
    // Even if the API call fails, clear locally anyway
  }
  setAuthToken(null);
  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  } catch { /* noop */ }
}

export function logout() {
  if (USE_MOCK) {
    setAuthToken(null);
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    } catch { /* noop */ }
  } else {
    realLogout();
  }
}

// ---------------- PUBLIC API ----------------
export async function login(params) {
  return USE_MOCK ? mockLogin(params) : realLogin(params);
}

export async function register(payload) {
  return USE_MOCK ? mockRegister(payload) : realRegister(payload);
}
