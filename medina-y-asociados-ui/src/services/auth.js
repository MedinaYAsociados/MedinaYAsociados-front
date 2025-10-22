// Lightweight mock auth service. Replace with real API calls later.
export async function login({ email, password }) {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 700));

  // Simple mock rule: any email containing "@" and password length >= 6 succeeds
  if (!email?.includes('@') || (password?.length ?? 0) < 6) {
    const error = new Error('Credenciales inválidas');
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  return { token: 'mock-token', user: { email } };
}

export async function register(payload) {
  await new Promise((r) => setTimeout(r, 900));

  // pretend to persist and return ok
  if (!payload?.email?.includes('@')) {
    const error = new Error('Email inválido');
    error.code = 'INVALID_EMAIL';
    throw error;
  }
  return { ok: true, id: Math.random().toString(36).slice(2) };
}
