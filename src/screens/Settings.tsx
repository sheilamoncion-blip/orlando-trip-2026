import { useRef, useState } from 'react';
import BackButton from '../components/BackButton';
import { Trash2, Download, Upload } from 'lucide-react';
import { isWeatherConfigured } from '../lib/weather';
import { db } from '../lib/db';

// Clave para desbloquear "Borrar todos los datos" — las fechas del viaje, fácil de recordar
// para la familia pero no un botón que se apriete sin querer.
const DELETE_PASSCODE = '082226';

export default function Settings() {
  const [me, setMeState] = useState(() => db.getMe());
  const family = db.getFamily();
  const [confirmText, setConfirmText] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const exportBackup = () => {
    const json = db.exportAll();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orlando-trip-2026-respaldo-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        db.importAll(reader.result as string);
        alert('Respaldo restaurado. Recargando...');
        window.location.reload();
      } catch {
        alert('Ese archivo no parece ser un respaldo válido.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <BackButton fallback="/mas" label="Más" />
      <header>
        <h1 className="text-xl font-extrabold text-slate-800">Ajustes</h1>
      </header>

      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-800 mb-1">¿Quién eres?</h2>
        <p className="text-xs text-slate-500 mb-2">Se usa para marcar "quiero visitar", tus platos probados y el feed de actividad de Hoy.</p>
        <select
          value={me}
          onChange={e => { db.setMe(e.target.value); setMeState(e.target.value); }}
          className="w-full border border-slate-200 rounded-lg px-2.5 py-2 text-sm bg-slate-50 focus:outline-none"
        >
          <option value="">Selecciona tu nombre...</option>
          {family.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

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

      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm space-y-2">
        <h2 className="text-sm font-semibold text-slate-800 mb-1">Respaldo</h2>
        <p className="text-xs text-slate-500">Toda la información (comentarios, checklist, fotos) se guarda solo en este navegador/dispositivo — no hay nube. Descarga un respaldo de vez en cuando para no perder nada.</p>
        <div className="flex gap-2">
          <button onClick={exportBackup} className="flex-1 flex items-center justify-center gap-1.5 bg-brand-50 text-brand-700 px-3 py-2 rounded-lg text-xs font-medium">
            <Download size={13} /> Descargar respaldo
          </button>
          <button onClick={() => fileInput.current?.click()} className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-2 rounded-lg text-xs font-medium">
            <Upload size={13} /> Restaurar respaldo
          </button>
          <input ref={fileInput} type="file" accept="application/json" onChange={importBackup} className="hidden" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-800 mb-2">Zona de peligro</h2>
        <p className="text-xs text-slate-500 mb-2">Esto borra TODO lo guardado en este dispositivo (fotos, comentarios, familia, checklist) y no se puede deshacer. Descarga un respaldo antes si no estás seguro. Clave: la fecha de llegada (MMDDAA).</p>
        <input
          value={confirmText}
          onChange={e => setConfirmText(e.target.value)}
          type="password"
          placeholder="Clave para borrar"
          className="w-full border border-slate-200 rounded-lg px-2.5 py-2 text-xs bg-slate-50 focus:outline-none mb-2"
        />
        <button
          disabled={confirmText !== DELETE_PASSCODE}
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="flex items-center gap-1.5 bg-rose-50 text-rose-600 px-3 py-2 rounded-lg text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Trash2 size={13} /> Borrar todos los datos
        </button>
      </div>
    </div>
  );
}
