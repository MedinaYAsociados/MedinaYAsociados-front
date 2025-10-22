import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function ClientDetailCard({ label, value }) {
  return (
    <div className="rounded-2xl shadow-soft bg-white/70 backdrop-blur-sm overflow-hidden">
      <div className="bg-white/60 px-4 py-3 text-center border-b border-black/5">
        <h3 className="text-lg font-bold text-[#3D3229]">{label}</h3>
      </div>
      <div className="bg-black/5 p-4">
        <p className="text-[#3D3229] text-lg font-semibold text-center">
          {value || '-'}
        </p>
      </div>
    </div>
  );
}

function LawyerClientDetail({ client, onBack, onHome, onDeleteClient }) {
  if (!client) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-[#3D3229]">No se encontró el cliente.</p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm(`¿Está seguro que desea eliminar al cliente ${client.name}?`)) {
      onDeleteClient?.(client);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <button 
            onClick={onBack}
            className="p-2.5 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
            aria-label="Volver"
          >
            <MdOutlineArrowBack className="w-5 h-5" />
          </button>
          <button 
            onClick={onHome}
            className="p-2.5 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
            aria-label="Inicio"
          >
            <MdHome className="w-5 h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-[#3D3229]">
            Cliente
          </h1>
        </div>

        {/* Contenedor principal */}
        <div className="bg-[#C9B896]/60 rounded-3xl p-6 space-y-4 animate-slide-up">
          {/* Nombre y apellido */}
          <ClientDetailCard 
            label="Nombre y apellido" 
            value={client.name} 
          />

          {/* Teléfono */}
          <ClientDetailCard 
            label="Telefono" 
            value={client.phone || client.telefono} 
          />

          {/* Localidad */}
          <ClientDetailCard 
            label="Localidad" 
            value={client.localidad} 
          />

          {/* Calle */}
          <ClientDetailCard 
            label="Calle" 
            value={client.street || client.calle} 
          />

          {/* Numero */}
          <ClientDetailCard 
            label="Numero" 
            value={client.number || client.numero} 
          />

          {/* Piso y Depto */}
          <div className="grid grid-cols-2 gap-4">
            <ClientDetailCard 
              label="Piso" 
              value={client.floor || client.piso} 
            />
            <ClientDetailCard 
              label="Depto" 
              value={client.apartment || client.departamento} 
            />
          </div>

          {/* Email */}
          <ClientDetailCard 
            label="Email" 
            value={client.email} 
          />
        </div>

        {/* Botón Eliminar cliente */}
        <div className="mt-6 animate-slide-up">
          <button
            onClick={handleDelete}
            className="w-full px-6 py-3.5 bg-[#B8D4A5] 
                     border-2 border-[#3D3229] rounded-xl
                     text-[#3D3229] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/30"
          >
            Eliminar cliente
          </button>
        </div>
      </div>
    </div>
  );
}

export default LawyerClientDetail;
