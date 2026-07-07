import { useNavigate } from 'react-router-dom';
import { MdGavel } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleEditProfile = () => navigate('/profile');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#53667B] text-white px-4 sm:px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MdGavel className="w-6 h-6 text-[#C6A15B]" />
          <span className="text-lg font-bold text-[#C6A15B]">Medina & Asociados</span>
        </div>
        <ProfileDropdown onEditProfile={handleEditProfile} onLogout={handleLogout} />
      </div>
    </nav>
  );
}

export default Navbar;
