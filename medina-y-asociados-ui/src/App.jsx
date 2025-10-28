
import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import RegisterSuccess from './components/RegisterSuccess'
import ClientDashboard from './components/ClientDashboard'
import LawyerDashboard from './components/LawyerDashboard'
import LawyerAppointments from './components/LawyerAppointments'
import LawyerAppointmentDetail from './components/LawyerAppointmentDetail'
import LawyerSearchAppointment from './components/LawyerSearchAppointment'
import LawyerSearchResults from './components/LawyerSearchResults'
import LawyerNewAppointmentClient from './components/LawyerNewAppointmentClient'
import LawyerHistory from './components/LawyerHistory'
import LawyerClients from './components/LawyerClients'
import LawyerClientDetail from './components/LawyerClientDetail'
import LawyerSearchClient from './components/LawyerSearchClient'
import LawyerSearchClientResults from './components/LawyerSearchClientResults'
import NewAppointmentSpecialty from './components/NewAppointmentSpecialty'
import NewAppointmentLawyer from './components/NewAppointmentLawyer'
import NewAppointmentDateTime from './components/NewAppointmentDateTime'
import AppointmentDetail from './components/AppointmentDetail'
import EditProfile from './components/EditProfile'

function App() {
  const [view, setView] = useState('login') // 'login' | 'register' | 'success' | 'dashboard' | 'edit-profile' | 'lawyer-appointments' | 'lawyer-appointment-detail' | 'lawyer-history' | 'lawyer-clients' | 'lawyer-client-detail' | 'lawyer-search-client' | 'lawyer-search-client-results' | 'lawyer-search' | 'lawyer-search-results' | 'lawyer-new-client' | 'new-specialty' | 'new-lawyer' | 'new-datetime' | 'appointment-detail'
  const [user, setUser] = useState(null)
  const [selectedSpecialty, setSelectedSpecialty] = useState(null)
  const [selectedLawyer, setSelectedLawyer] = useState(null)
  const [currentAppointment, setCurrentAppointment] = useState(null)
  const [isRescheduling, setIsRescheduling] = useState(false)
  const [clientData, setClientData] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [previousView, setPreviousView] = useState('dashboard')
  const [selectedClient, setSelectedClient] = useState(null)
  const [clientSearchResults, setClientSearchResults] = useState([])
  const [clientListView, setClientListView] = useState('lawyer-clients') // Para saber de dónde vino el cliente

  const handleLoginSuccess = (loggedUser) => {
    setUser(loggedUser);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  const handlePaymentRedirect = (appointmentData) => {
    // Si estamos reprogramando, no redirigir a pago
    if (isRescheduling) {
      console.log('Turno reprogramado exitosamente:', appointmentData);
      alert('¡Turno reprogramado exitosamente!\n\nSu turno ha sido reprogramado sin cargo adicional ya que el pago fue realizado previamente.');
      setIsRescheduling(false);
      setClientData(null);
      setSelectedSpecialty(null);
      setSelectedLawyer(null);
      setView('dashboard');
      return;
    }
    
    // Si es el abogado creando turno para un cliente, no redirigir a pago
    if (clientData) {
      console.log('Turno creado exitosamente para:', clientData, appointmentData);
      alert(`¡Turno creado exitosamente para ${clientData.firstName} ${clientData.lastName}!`);
      setClientData(null);
      setSelectedSpecialty(null);
      setSelectedLawyer(null);
      setView('dashboard');
      return;
    }
    
    // TODO: Integrar con MercadoPago
    console.log('Redirigiendo a MercadoPago con:', appointmentData);
    // Por ahora, simular redirección
    alert('Redirigiendo a MercadoPago para completar el pago...');
    // En producción: window.location.href = mercadoPagoUrl;
  };

  const handleReschedule = () => {
    setIsRescheduling(true);
    // Cuando se reprograma, mantener la especialidad y abogado actuales
    // e ir directo a selección de fecha y hora
    if (currentAppointment) {
      setSelectedSpecialty(currentAppointment.specialty);
      setSelectedLawyer(currentAppointment.lawyer);
    }
    setView('new-datetime');
  };

  const handleCancelAppointment = () => {
    if (confirm('¿Está seguro que desea cancelar este turno?')) {
      console.log('Turno cancelado:', currentAppointment);
      alert('Turno cancelado exitosamente');
      setView('dashboard');
    }
  };

  const handleEditProfile = () => {
    setPreviousView(view);
    setView('edit-profile');
  };

  const handleSaveProfile = (updatedData) => {
    // TODO: Guardar datos en backend
    console.log('Perfil actualizado:', updatedData);
    setUser({ ...user, ...updatedData });
  };

  const handleBackFromProfile = () => {
    setView(previousView);
  };

  return (
    <>
      {view === 'login' && (
        <Login onGoRegister={() => setView('register')} onSuccess={handleLoginSuccess} />
      )}
      {view === 'register' && (
        <Register onSuccess={() => setView('success')} onGoLogin={() => setView('login')} />
      )}
      {view === 'success' && (
        <RegisterSuccess onGoLogin={() => setView('login')} />
      )}
      {view === 'dashboard' && user && user.role === 'client' && (
        <ClientDashboard 
          onLogout={handleLogout} 
          onNewAppointment={() => { setIsRescheduling(false); setView('new-specialty'); }}
          onViewAppointment={(appt) => { setCurrentAppointment(appt); setView('appointment-detail'); }}
          onEditProfile={handleEditProfile}
        />
      )}
      {view === 'dashboard' && user && user.role === 'lawyer' && (
        <LawyerDashboard
          user={user}
          onLogout={handleLogout}
          onViewAppointments={() => setView('lawyer-appointments')}
          onViewClients={() => setView('lawyer-clients')}
          onViewHistory={() => setView('lawyer-history')}
          onEditProfile={handleEditProfile}
        />
      )}
      {view === 'edit-profile' && user && (
        <EditProfile
          user={user}
          onBack={handleBackFromProfile}
          onHome={() => setView('dashboard')}
          onSave={handleSaveProfile}
        />
      )}
      {view === 'lawyer-appointments' && (
        <LawyerAppointments
          user={user}
          onBack={() => setView('dashboard')}
          onHome={() => setView('dashboard')}
          onNewAppointment={() => setView('lawyer-new-client')}
          onSearchAppointment={() => setView('lawyer-search')}
          onViewAppointment={(appt) => { setCurrentAppointment(appt); setView('lawyer-appointment-detail'); }}
        />
      )}
      {view === 'lawyer-history' && (
        <LawyerHistory
          user={user}
          onBack={() => setView('dashboard')}
          onHome={() => setView('dashboard')}
          onSearchAppointment={() => setView('lawyer-search')}
          onViewAppointment={(appt) => { setCurrentAppointment(appt); setView('lawyer-appointment-detail'); }}
        />
      )}
      {view === 'lawyer-clients' && (
        <LawyerClients
          user={user}
          onBack={() => setView('dashboard')}
          onHome={() => setView('dashboard')}
          onSearchClient={() => setView('lawyer-search-client')}
          onViewClient={(client) => { 
            setSelectedClient(client);
            setClientListView('lawyer-clients');
            setView('lawyer-client-detail'); 
          }}
        />
      )}
      {view === 'lawyer-search-client' && (
        <LawyerSearchClient
          onBack={() => setView('lawyer-clients')}
          onHome={() => setView('dashboard')}
          onSearch={(filters) => {
            console.log('Filtros de búsqueda de clientes:', filters);
            
            // Mock de clientes para búsqueda
            const allClients = [
              { 
                id: 1, 
                name: 'Ramiro Doglio', 
                dni: '12345678', 
                localidad: 'Capital',
                phone: '3534234567',
                email: 'ramiro@gmail.com',
                calle: 'Carlos Pelegrini',
                numero: '865',
                piso: '1',
                departamento: '1'
              },
              { 
                id: 2, 
                name: 'Manuel Veronese', 
                dni: '23456789', 
                localidad: 'Villa Maria',
                phone: '3534123123',
                email: 'manuelveronese@gmail.com',
                calle: 'America',
                numero: '1256',
                piso: '',
                departamento: ''
              },
              { 
                id: 3, 
                name: 'Juan Perez', 
                dni: '34567890', 
                localidad: 'Capital',
                phone: '3534345678',
                email: 'juan@gmail.com',
                calle: 'San Martín',
                numero: '321',
                piso: '1',
                departamento: 'A'
              },
              { 
                id: 4, 
                name: 'Santiago Gonzales', 
                dni: '45678901', 
                localidad: 'Guaymallén',
                phone: '3534456789',
                email: 'santiago@gmail.com',
                calle: 'Mitre',
                numero: '789',
                piso: '',
                departamento: ''
              },
              { 
                id: 5, 
                name: 'Catalina Pereira', 
                dni: '56789012', 
                localidad: 'Luján',
                phone: '3534567890',
                email: 'catalina@gmail.com',
                calle: 'Belgrano',
                numero: '456',
                piso: '2',
                departamento: 'B'
              },
              { 
                id: 6, 
                name: 'María González', 
                dni: '67890123', 
                localidad: 'Capital',
                phone: '3534678901',
                email: 'maria@gmail.com',
                calle: 'Rivadavia',
                numero: '123',
                piso: '3',
                departamento: 'C'
              },
              { 
                id: 7, 
                name: 'Carlos Ramírez', 
                dni: '78901234', 
                localidad: 'Godoy Cruz',
                phone: '3534789012',
                email: 'carlos@gmail.com',
                calle: 'Las Heras',
                numero: '654',
                piso: '',
                departamento: ''
              }
            ];

            // Filtrar clientes
            let filtered = allClients;
            
            if (filters.name.trim()) {
              filtered = filtered.filter(c => 
                c.name.toLowerCase().includes(filters.name.toLowerCase())
              );
            }
            
            if (filters.dni.trim()) {
              filtered = filtered.filter(c => 
                c.dni.includes(filters.dni)
              );
            }
            
            if (filters.localidad.trim()) {
              filtered = filtered.filter(c => 
                c.localidad.toLowerCase().includes(filters.localidad.toLowerCase())
              );
            }

            setClientSearchResults(filtered);
            setView('lawyer-search-client-results');
          }}
        />
      )}
      {view === 'lawyer-search-client-results' && (
        <LawyerSearchClientResults
          results={clientSearchResults}
          onBack={() => setView('lawyer-search-client')}
          onHome={() => setView('dashboard')}
          onViewClient={(client) => {
            setSelectedClient(client);
            setClientListView('lawyer-search-client-results');
            setView('lawyer-client-detail');
          }}
          onSearchAgain={() => setView('lawyer-search-client')}
        />
      )}
      {view === 'lawyer-client-detail' && (
        <LawyerClientDetail
          client={selectedClient}
          onBack={() => setView(clientListView)}
          onHome={() => setView('dashboard')}
          onDeleteClient={(client) => {
            console.log('Eliminar cliente:', client);
            alert(`Cliente ${client.name} eliminado exitosamente`);
            setView('lawyer-clients');
          }}
        />
      )}
      {view === 'lawyer-search' && (
        <LawyerSearchAppointment
          onBack={() => setView('lawyer-appointments')}
          onHome={() => setView('dashboard')}
          onSearch={(filters) => {
            console.log('Filtros de búsqueda:', filters);
            
            // Mock de búsqueda - filtrar por los criterios
            const allAppointments = [
              {
                id: 1,
                number: 1,
                clientName: 'Ramiro Doglio',
                date: new Date('2025-12-12T13:00:00'),
                status: 'cancelled'
              },
              {
                id: 2,
                number: 2,
                clientName: 'Ramiro Doglio',
                date: new Date('2025-11-15T14:30:00'),
                status: 'pending'
              },
              {
                id: 3,
                number: 3,
                clientName: 'María González',
                date: new Date('2025-12-18T16:00:00'),
                status: 'confirmed'
              },
              {
                id: 4,
                number: 4,
                clientName: 'Carlos Pérez',
                date: new Date('2025-10-10T12:00:00'),
                status: 'completed'
              }
            ];

            // Filtrar por rango de fechas
            let filtered = allAppointments.filter(appt => {
              const apptDate = new Date(appt.date);
              apptDate.setHours(0, 0, 0, 0);
              const from = new Date(filters.dateFrom);
              from.setHours(0, 0, 0, 0);
              const to = new Date(filters.dateTo);
              to.setHours(23, 59, 59, 999);
              return apptDate >= from && apptDate <= to;
            });

            // Filtrar por estado si se seleccionó uno
            if (filters.status) {
              filtered = filtered.filter(appt => appt.status === filters.status);
            }

            // Filtrar por nombre de cliente si se ingresó uno
            if (filters.clientName.trim()) {
              const searchTerm = filters.clientName.toLowerCase();
              filtered = filtered.filter(appt => 
                appt.clientName.toLowerCase().includes(searchTerm)
              );
            }

            setSearchResults(filtered);
            setView('lawyer-search-results');
          }}
        />
      )}
      {view === 'lawyer-search-results' && (
        <LawyerSearchResults
          results={searchResults}
          onBack={() => setView('lawyer-search')}
          onHome={() => setView('dashboard')}
          onViewAppointment={(appt) => { 
            setCurrentAppointment(appt); 
            setView('lawyer-appointment-detail'); 
          }}
        />
      )}
      {view === 'lawyer-appointment-detail' && (
        <LawyerAppointmentDetail
          appointment={currentAppointment}
          onBack={() => setView('lawyer-appointments')}
          onHome={() => setView('dashboard')}
          onReschedule={() => {
            setIsRescheduling(true);
            // Cuando se reprograma, mantener la especialidad y abogado actuales
            // e ir directo a selección de fecha y hora
            if (currentAppointment) {
              setSelectedSpecialty(currentAppointment.specialty);
              setSelectedLawyer(currentAppointment.lawyer);
            }
            setView('new-datetime');
          }}
          onCancel={() => {
            if (confirm('¿Está seguro que desea cancelar este turno?')) {
              console.log('Turno cancelado:', currentAppointment);
              alert('Turno cancelado exitosamente');
              setView('lawyer-appointments');
            }
          }}
          onConfirm={() => {
            if (confirm('¿Confirmar este turno?')) {
              console.log('Turno confirmado:', currentAppointment);
              alert('Turno confirmado exitosamente');
              setView('lawyer-appointments');
            }
          }}
        />
      )}
      {view === 'lawyer-new-client' && (
        <LawyerNewAppointmentClient
          onBack={() => setView('lawyer-appointments')}
          onHome={() => setView('dashboard')}
          onContinue={(data) => {
            setClientData(data);
            setView('new-specialty');
          }}
        />
      )}
      {view === 'appointment-detail' && (
        <AppointmentDetail
          appointment={currentAppointment}
          onBack={() => setView('dashboard')}
          onHome={() => setView('dashboard')}
          onReschedule={handleReschedule}
          onCancel={handleCancelAppointment}
        />
      )}
      {view === 'new-specialty' && (
        <NewAppointmentSpecialty 
          onBack={() => {
            if (isRescheduling) {
              setView('appointment-detail');
            } else if (clientData) {
              setView('lawyer-new-client');
            } else {
              setView('dashboard');
            }
          }} 
          onHome={() => { 
            setIsRescheduling(false); 
            setClientData(null);
            setView('dashboard'); 
          }} 
          onSelect={(sp) => { setSelectedSpecialty(sp); setView('new-lawyer'); }}
        />
      )}
      {view === 'new-lawyer' && (
        <NewAppointmentLawyer
          selectedSpecialty={selectedSpecialty}
          onBack={() => setView('new-specialty')}
          onHome={() => { 
            setIsRescheduling(false); 
            setClientData(null);
            setView('dashboard'); 
          }}
          onSelect={(lawyer) => { setSelectedLawyer(lawyer); setView('new-datetime'); }}
        />
      )}
      {view === 'new-datetime' && (
        <NewAppointmentDateTime
          selectedSpecialty={selectedSpecialty}
          selectedLawyer={selectedLawyer}
          clientData={clientData}
          isRescheduling={isRescheduling}
          onBack={() => {
            // Si estamos reprogramando, volver al detalle del turno
            if (isRescheduling) {
              setIsRescheduling(false);
              // Determinar si es cliente o abogado
              if (user?.role === 'lawyer') {
                setView('lawyer-appointment-detail');
              } else {
                setView('appointment-detail');
              }
            } else {
              // Si no, volver al paso anterior (selección de abogado)
              setView('new-lawyer');
            }
          }}
          onHome={() => { 
            setIsRescheduling(false); 
            setClientData(null);
            setView('dashboard'); 
          }}
          onConfirm={handlePaymentRedirect}
        />
      )}
    </>
  )
}

export default App
