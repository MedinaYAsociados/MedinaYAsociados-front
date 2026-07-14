import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { MdCheckCircle, MdCancel, MdSchedule } from 'react-icons/md';

function PaymentResult() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const [countdown, setCountdown] = useState(5);

  const config = {
    success: {
      icon: MdCheckCircle,
      title: '¡Pago exitoso!',
      message: 'Su turno ha sido confirmado.',
      color: 'text-green-600',
    },
    failure: {
      icon: MdCancel,
      title: 'Pago fallido',
      message: 'El pago no pudo completarse. Puede intentarlo nuevamente desde el detalle del turno.',
      color: 'text-red-600',
    },
    pending: {
      icon: MdSchedule,
      title: 'Pago pendiente',
      message: 'El pago está siendo procesado. Recibirá una confirmación en breve.',
      color: 'text-yellow-600',
    },
  };

  const current = config[status] || config.failure;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/dashboard');
    }
  }, [countdown, navigate]);

  const Icon = current.icon;

  return (
    <div className="min-h-screen bg-[#ECEFF3] flex items-center justify-center px-4">
      <div className="bg-white/70 rounded-3xl shadow-elevated p-8 max-w-md w-full text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <Icon className={`w-20 h-20 ${current.color}`} />
        </div>
        <h1 className="text-2xl font-extrabold text-[#53667B] mb-2">{current.title}</h1>
        <p className="text-[#53667B]/80 mb-2">Turno N° {id}</p>
        <p className="text-[#53667B]/70 mb-6">{current.message}</p>
        <p className="text-[#53667B]/60 text-sm">
          Redirigiendo al inicio en {countdown} segundos...
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-6 py-3 bg-[#C6A15B] border-2 border-[#C6A15B] rounded-xl
                   text-[#53667B] font-bold shadow-medium hover:shadow-elevated
                   hover:bg-[#A8C495] active:scale-[0.98] transition-all"
        >
          Ir al inicio ahora
        </button>
      </div>
    </div>
  );
}

export default PaymentResult;
