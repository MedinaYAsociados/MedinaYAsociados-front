extensiones que use

- taildwind css intelligence
- live preview

comandos:

- npm run dev
- npm  i
- npm install tailwindcss @tailwindcss/vite


# conectar el back end. 
## Debemos usar fetch, no axios

1. Configurar el base URL
- Crea un archivo .env en medina-y-asociados-ui con:
VITE_API_BASE_URL=http://localhost:8080/api
- Reinicia el servidor de Vite.
2. Cambiar a modo real

- En src/services/auth.js,  cambia:
const USE_MOCK = true;
a:
const USE_MOCK = false;
3. Ajustar endpoints si difieren
- Si tu backend usa otros paths (ej. /api/v1/auth/login), actualiza realLogin/realRegister.
4. Manejo de sesión
- Cuando el backend esté listo, podemos guardar el token en localStorage y crear un AuthContext para toda la app, o usar cookies si tu Spring Boot emite sesión.

# Credenciales de prueba:

- Cliente: cliente@test.com / 123456
- Abogado: abogado@test.com / 123456


# Aplicacion para Medina y Asociados

✅ Sistema de autenticación con roles (cliente/abogado)
✅ Dashboard del cliente con gestión de turnos
✅ Dashboard completo del abogado con:

Gestión de turnos actuales
Historial de turnos con estados
Sistema completo de gestión de clientes
Búsquedas avanzadas (turnos y clientes)
✅ Flujo completo de reserva de turnos
✅ Sistema de edición de perfiles
✅ Diseño consistente con la paleta de colores de Figma
✅ UI/UX pulida con animaciones y transiciones
La aplicación quedó profesional, funcional y lista para integrarse con el backend cuando sea necesario.


# acomoda
- eliminar boton eliminar cliente
- pantallas admin
    - para cambiar el rol del user y agregar matricula y especialidades
    - cambiar precios
- botones agregar o sacar:
- cuando reprogramemos un turno, sea para la hora y la fecha, no la especialdiad y abogado
- agrergar boton de asisitio o no asisitio