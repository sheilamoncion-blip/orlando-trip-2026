import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ fallback = '/', label = 'Atrás' }: { fallback?: string; label?: string }) {
  const navigate = useNavigate();
  const goBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate(fallback);
  };
  return (
    <button onClick={goBack} className="inline-flex items-center gap-1 text-sm text-brand-600">
      <ArrowLeft size={14} /> {label}
    </button>
  );
}
