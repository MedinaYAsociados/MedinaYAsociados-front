function RegisterSuccess({ onGoLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 py-10 animate-fade-in">
      <div className="w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3D3229] text-center mb-12 animate-slide-up">
          Bienvenido a Medina y Asociados
        </h1>

        <div className="mx-auto bg-white/50 backdrop-blur-md rounded-3xl p-10 sm:p-12 text-center shadow-elevated animate-slide-up">
          {/* Ícono de éxito */}
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-[#B8D4A5] rounded-full shadow-medium">
            <svg className="w-8 h-8 text-[#3D3229]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className="text-[#3D3229] text-2xl sm:text-3xl font-bold leading-snug mb-2">
            ¡Registro exitoso!
          </p>
          <p className="text-[#3D3229]/70 text-sm sm:text-base mb-8">
            Tu cuenta ha sido creada correctamente
          </p>

          <button
            onClick={onGoLogin}
            className="mx-auto block px-10 py-3.5 bg-[#B8D4A5] border-2 border-[#3D3229] rounded-xl 
                     text-[#3D3229] text-lg sm:text-xl font-bold 
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/50"
          >
            Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccess;
