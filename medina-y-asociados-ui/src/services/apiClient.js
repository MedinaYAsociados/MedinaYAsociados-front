// Lightweight fetch wrapper for consistent API calls.
// Configure Vite env var VITE_API_BASE_URL, e.g. http://localhost:8080/api
const BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:8080/api';

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

async function request(path, { method = 'GET', body, headers = {}, signal } = {}) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;

  const finalHeaders = {
    'Accept': 'application/json',
    ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...headers,
  };

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body instanceof FormData ? body : body != null ? JSON.stringify(body) : undefined,
    signal,
    credentials: 'include', // adjust if your backend uses cookies or not
  });

  // Try to parse JSON; safe fallback
  let data = null;
  const text = await res.text();
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const err = new Error((data && (data.message || data.error)) || res.statusText || 'Request error');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};

export default api;
