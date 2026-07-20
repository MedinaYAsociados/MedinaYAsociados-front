export function isEmail(value) {
  if (!value) return false;
  return /\S+@\S+\.\S+/.test(value);
}

export function required(value) {
  return value != null && String(value).trim().length > 0;
}

export function isDigits(value) {
  return /^\d+$/.test(String(value ?? ''));
}

export function minLength(value, n) {
  return String(value ?? '').length >= n;
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!isEmail(email)) errors.email = 'Email inválido';
  if (!minLength(password, 6)) errors.password = 'Mínimo 6 caracteres';
  return errors;
}

export function validateRegisterForm(f) {
  const errors = {};
  if (!required(f.nombre)) errors.nombre = 'Requerido';
  if (!required(f.apellido)) errors.apellido = 'Requerido';
  if (!isDigits(f.dni) || !minLength(f.dni, 7)) errors.dni = 'DNI inválido';
  if (!isDigits(f.telefono) || !minLength(f.telefono, 7)) errors.telefono = 'Teléfono inválido';
  if (!required(f.localidad)) errors.localidad = 'Selecciona una opción';
  if (!required(f.calle)) errors.calle = 'Requerido';
  if (!isDigits(f.numero)) errors.numero = 'Solo números';
  if (!isEmail(f.email)) errors.email = 'Email inválido';
  if (!minLength(f.password, 6)) errors.password = 'Mínimo 6 caracteres';
  return errors;
}
