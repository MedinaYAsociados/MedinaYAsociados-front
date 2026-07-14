import { useState, useRef, useEffect } from 'react';
import { MdPerson, MdLogout, MdAccountCircle } from 'react-icons/md';

function ProfileDropdown({ onEditProfile, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="p-2 rounded-full border-2 border-[#C6A15B]/30 bg-white/40 text-[#53667B] hover:bg-white/60 transition-colors cursor-pointer"
        aria-label="Menú de perfil"
      >
        <MdPerson className="w-14 h-14 opacity-90" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-[#C6A15B]/10 overflow-hidden z-50 animate-fade-in">
          <button
            onClick={() => { setOpen(false); onEditProfile(); }}
            className="w-full px-5 py-4 flex items-center gap-3 text-[#53667B] hover:bg-[#6C7F94]/20 transition-colors font-semibold text-base"
          >
            <MdAccountCircle className="w-6 h-6" />
            Mi Perfil
          </button>
          <div className="border-t border-[#C6A15B]/10" />
          <button
            onClick={() => { setOpen(false); onLogout(); }}
            className="w-full px-5 py-4 flex items-center gap-3 text-red-700 hover:bg-red-50 transition-colors font-semibold text-base"
          >
            <MdLogout className="w-6 h-6" />
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
