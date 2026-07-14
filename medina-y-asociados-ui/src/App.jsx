import { Routes, Route, Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { ProtectedRoute, AdminRoute, LawyerRoute } from './components/ProtectedRoute';
import DashboardRouter from './components/DashboardRouter';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import RegisterSuccess from './components/RegisterSuccess';
import RoleSelector from './components/RoleSelector';
import ClientDashboard from './components/ClientDashboard';
import LawyerDashboard from './components/LawyerDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminManageLawyers from './components/AdminManageLawyers';
import AdminCreateLawyer from './components/AdminCreateLawyer';
import AdminUserFound from './components/AdminUserFound';
import AdminCreateLawyerForm from './components/AdminCreateLawyerForm';
import AdminUpdateLawyer from './components/AdminUpdateLawyer';
import AdminUpdateLawyerForm from './components/AdminUpdateLawyerForm';
import AdminManagePricing from './components/AdminManagePricing';
import LawyerAppointments from './components/LawyerAppointments';
import LawyerAppointmentDetail from './components/LawyerAppointmentDetail';
import LawyerSearchAppointment from './components/LawyerSearchAppointment';
import LawyerSearchResults from './components/LawyerSearchResults';
import LawyerNewAppointmentClient from './components/LawyerNewAppointmentClient';
import LawyerHistory from './components/LawyerHistory';
import LawyerClients from './components/LawyerClients';
import LawyerClientDetail from './components/LawyerClientDetail';
import LawyerSearchClient from './components/LawyerSearchClient';

import NewAppointmentSpecialty from './components/NewAppointmentSpecialty';
import NewAppointmentLawyer from './components/NewAppointmentLawyer';
import NewAppointmentDateTime from './components/NewAppointmentDateTime';
import AppointmentDetail from './components/AppointmentDetail';
import TurnoHistory from './components/TurnoHistory';
import TurnoCobro from './components/TurnoCobro';
import EditProfile from './components/EditProfile';
import PaymentResult from './components/PaymentResult';

function AuthLayout() {
  const { user } = useAuth();
  return (
    <AppointmentProvider>
      <Navbar />
      <Outlet context={{ user }} />
    </AppointmentProvider>
  );
}

function AppointmentWizardLayout() {
  return <Outlet />;
}

function LawyerAppointmentLayout() {
  const outletCtx = useOutletContext();
  return <Outlet context={outletCtx} />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-success" element={<RegisterSuccess />} />

      <Route element={<ProtectedRoute><AuthLayout /></ProtectedRoute>}>
        <Route path="/role-selector" element={<RoleSelector />} />
        <Route path="/dashboard" element={<DashboardRouter />} />
        <Route path="/dashboard/client" element={<ClientDashboard />} />
        <Route path="/dashboard/lawyer" element={<LawyerDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/payment/:id/result" element={<PaymentResult />} />
        <Route path="/appointments/:id" element={<AppointmentDetail />} />
        <Route path="/appointments/:id/history" element={<TurnoHistory />} />

        <Route element={<AppointmentWizardLayout />}>
          <Route path="/appointments/new/specialty" element={<NewAppointmentSpecialty />} />
          <Route path="/appointments/new/lawyer" element={<NewAppointmentLawyer />} />
          <Route path="/appointments/new/datetime" element={<NewAppointmentDateTime />} />
        </Route>

        <Route element={<LawyerRoute />}>
          <Route element={<LawyerAppointmentLayout />}>
            <Route path="/lawyer/appointments" element={<LawyerAppointments />} />
            <Route path="/lawyer/appointments/:id" element={<LawyerAppointmentDetail />} />
            <Route path="/lawyer/appointments/:id/history" element={<TurnoHistory />} />
            <Route path="/lawyer/appointments/:id/cobro" element={<TurnoCobro />} />
            <Route path="/lawyer/appointments/search" element={<LawyerSearchAppointment />} />
            <Route path="/lawyer/appointments/search/results" element={<LawyerSearchResults />} />
            <Route path="/lawyer/appointments/new/client" element={<LawyerNewAppointmentClient />} />
            <Route path="/lawyer/history" element={<LawyerHistory />} />
            <Route path="/lawyer/clients" element={<LawyerClients />} />
            <Route path="/lawyer/clients/:id" element={<LawyerClientDetail />} />
            <Route path="/lawyer/clients/search" element={<LawyerSearchClient />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/lawyers" element={<AdminManageLawyers />} />
          <Route path="/admin/lawyers/create" element={<AdminCreateLawyer />} />
          <Route path="/admin/lawyers/create/user-found" element={<AdminUserFound />} />
          <Route path="/admin/lawyers/create/form" element={<AdminCreateLawyerForm />} />
          <Route path="/admin/lawyers/update" element={<AdminUpdateLawyer />} />
          <Route path="/admin/lawyers/update/form" element={<AdminUpdateLawyerForm />} />
          <Route path="/admin/pricing" element={<AdminManagePricing />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
