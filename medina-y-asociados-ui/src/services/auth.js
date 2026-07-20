import api, { setAuthToken } from './apiClient';

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
  }
  setAuthToken(null);
  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  } catch {
  }
}

export function logout() {
  realLogout();
}

export async function login(params) {
  return realLogin(params);
}

export async function register(payload) {
  return realRegister(payload);
}
