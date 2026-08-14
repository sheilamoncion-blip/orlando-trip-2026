import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { db } from '../lib/db';
import { onMeModalRequest, hasPendingMeRequest, resolveMeModal } from '../lib/useMe';

export default function MeModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => onMeModalRequest(() => {
    setName('');
    setOpen(true);
  }), []);

  if (!open) return null;

  const family = db.getFamily();

  const confirm = (value: string) => {
    if (!value.trim()) return;
    resolveMeModal(value);
    setOpen(false);
  };

  const cancel = () => {
    if (hasPendingMeRequest()) resolveMeModal('');
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={cancel}>
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
            <User size={18} />
          </div>
          <h2 className="text-base font-bold text-slate-800">¿Quién eres?</h2>
        </div>
        <p className="text-xs text-slate-500 mb-3">Se usa para marcar "quiero visitar", tus platos probados y el feed de actividad de Hoy.</p>

        {family.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {family.map(f => (
              <button
                key={f}
                onClick={() => confirm(f)}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-400 hover:bg-brand-50"
              >
                {f}
              </button>
            ))}
          </div>
        )}

        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') confirm(name); }}
          placeholder="O escribe tu nombre..."
          autoFocus
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-300"
        />

        <div className="flex gap-2 mt-3">
          <button onClick={cancel} className="flex-1 py-2 rounded-lg text-sm font-medium text-slate-500 border border-slate-200">Cancelar</button>
          <button onClick={() => confirm(name)} className="flex-1 py-2 rounded-lg text-sm font-medium text-white bg-brand-600">Confirmar</button>
        </div>
      </div>
    </div>
  );
}
