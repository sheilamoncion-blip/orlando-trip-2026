import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { isWeatherConfigured } from '../lib/weather';

export default function Settings() {
  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <Link to="/mas" className="inline-flex items-center gap-1 text-sm text-brand-600"><ArrowLeft size={14} /> Más</Link>
      <header>
        <h1 className="text-xl font-extrabold text-slate-800">Ajustes</h1>
      </header>

      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-800 mb-1">Clima en vivo</h2>
        <p className="text-xs text-slate-500">
          {isWeatherConfigured()
            ? 'Configurado ✓ — usando OpenWeatherMap.'
            : 'No configurado. Crea una cuenta gratis en openweathermap.org/api, copia tu API key, y agrégala a un archivo .env en la raíz del proyecto: VITE_OPENWEATHERMAP_KEY=tu_key. Reinicia npm run dev.'}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-800 mb-1">Tiempos de espera en vivo</h2>
        <p className="text-xs text-slate-500">Usando la API pública y gratuita de ThemeParks.wiki — no requiere cuenta ni API key.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-800 mb-2">Datos</h2>
        <p className="text-xs text-slate-500 mb-2">Toda la información (comentarios, checklist, fotos) se guarda en este navegador/dispositivo.</p>
        <button
          onClick={() => {
            if (confirm('Esto borrará todos los datos guardados en este dispositivo. ¿Continuar?')) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="flex items-center gap-1.5 bg-rose-50 text-rose-600 px-3 py-2 rounded-lg text-xs font-medium"
        >
          <Trash2 size={13} /> Borrar todos los datos
        </button>
      </div>
    </div>
  );
}
