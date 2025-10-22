
import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import RegisterSuccess from './components/RegisterSuccess'
import ClientDashboard from './components/ClientDashboard'
import LawyerDashboard from './components/LawyerDashboard'
import LawyerAppointments from './components/LawyerAppointments'
import LawyerAppointmentDetail from './components/LawyerAppointmentDetail'
import LawyerNewAppointmentClient from './components/LawyerNewAppointmentClient'
import NewAppointmentSpecialty from './components/NewAppointmentSpecialty'
import NewAppointmentLawyer from './components/NewAppointmentLawyer'
import NewAppointmentDateTime from './components/NewAppointmentDateTime'
import AppointmentDetail from './components/AppointmentDetail'

function App() {
  const [view, setView] = useState('login') // 'login' | 'register' | 'success' | 'dashboard' | 'lawyer-appointments' | 'lawyer-appointment-detail' | 'lawyer-new-client' | 'new-specialty' | 'new-lawyer' | 'new-datetime' | 'appointment-detail'
  const [user, setUser] = useState(null)
  const [selectedSpecialty, setSelectedSpecialty] = useState(null)
  const [selectedLawyer, setSelectedLawyer] = useState(null)
  const [currentAppointment, setCurrentAppointment] = useState(null)
  const [isRescheduling, setIsRescheduling] = useState(false)
  const [clientData, setClientData] = useState(null)

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
      alert('¡Turno reprogramado exitosamente!');
      setIsRescheduling(false);
      setClientData(null);
      setView('dashboard');
      return;
    }
    
    // Si es el abogado creando turno para un cliente, no redirigir a pago
    if (clientData) {
      console.log('Turno creado exitosamente para:', clientData, appointmentData);
      alert(`¡Turno creado exitosamente para ${clientData.firstName} ${clientData.lastName}!`);
      setClientData(null);
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
    // Comenzar el flujo de nuevo turno pero sin pago al final
    setView('new-specialty');
  };

  const handleCancelAppointment = () => {
    if (confirm('¿Está seguro que desea cancelar este turno?')) {
      console.log('Turno cancelado:', currentAppointment);
      alert('Turno cancelado exitosamente');
      setView('dashboard');
    }
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
        />
      )}
      {view === 'dashboard' && user && user.role === 'lawyer' && (
        <LawyerDashboard
          user={user}
          onLogout={handleLogout}
          onViewAppointments={() => setView('lawyer-appointments')}
          onViewClients={() => console.log('Ver clientes')}
          onViewHistory={() => console.log('Ver historial')}
        />
      )}
      {view === 'lawyer-appointments' && (
        <LawyerAppointments
          user={user}
          onBack={() => setView('dashboard')}
          onHome={() => setView('dashboard')}
          onNewAppointment={() => setView('lawyer-new-client')}
          onSearchAppointment={() => console.log('Buscar turno')}
          onViewAppointment={(appt) => { setCurrentAppointment(appt); setView('lawyer-appointment-detail'); }}
        />
      )}
      {view === 'lawyer-appointment-detail' && (
        <LawyerAppointmentDetail
          appointment={currentAppointment}
          onBack={() => setView('lawyer-appointments')}
          onHome={() => setView('dashboard')}
          onReschedule={() => {
            setIsRescheduling(true);
            setView('new-specialty');
          }}
          onCancel={() => {
            if (confirm('¿Está seguro que desea cancelar este turno?')) {
              console.log('Turno cancelado:', currentAppointment);
              alert('Turno cancelado exitosamente');
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
          onBack={() => setView('new-lawyer')}
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
