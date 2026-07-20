import { createContext, useContext, useState, useCallback } from 'react';

const AppointmentContext = createContext(null);

export function AppointmentProvider({ children }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [clientData, setClientData] = useState(null);

  const resetWizard = useCallback(() => {
    setSelectedSpecialty(null);
    setSelectedLawyer(null);
    setCurrentAppointment(null);
    setIsRescheduling(false);
    setClientData(null);
  }, []);

  const startReschedule = useCallback((appointment) => {
    setCurrentAppointment(appointment);
    setIsRescheduling(true);
    if (appointment) {
      setSelectedSpecialty(appointment.specialty);
      const abogadoId = appointment.lawyerId || appointment.abogadoId;
      setSelectedLawyer(abogadoId ? { idUsuario: abogadoId } : null);
    }
  }, []);

  const startNewForClient = useCallback((data) => {
    setClientData(data);
    setSelectedSpecialty(null);
    setSelectedLawyer(null);
    setIsRescheduling(false);
  }, []);

  return (
    <AppointmentContext.Provider value={{
      selectedSpecialty,
      setSelectedSpecialty,
      selectedLawyer,
      setSelectedLawyer,
      currentAppointment,
      setCurrentAppointment,
      isRescheduling,
      setIsRescheduling,
      clientData,
      setClientData,
      resetWizard,
      startReschedule,
      startNewForClient,
    }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointment() {
  const ctx = useContext(AppointmentContext);
  if (!ctx) throw new Error('useAppointment must be used within an AppointmentProvider');
  return ctx;
}

export default AppointmentContext;
