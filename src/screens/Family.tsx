import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, X, MapPinned } from 'lucide-react';
import { db } from '../lib/db';

export default function Family() {
  const [family, setFamily] = useState<string[]>(() => db.getFamily());
  const [name, setName] = useState('');
  const [groupStatus, setGroupStatus] = useState(() => db.getGroupStatus());
  const [myStatus, setMyStatus] = useState('');

  const add = () => {
    if (!name.trim()) return;
    const updated = [...family, name.trim()];
    setFamily(updated);
    db.saveFamily(updated);
    setName('');
  };

  const remove = (n: string) => {
    const updated = family.filter(f => f !== n);
    setFamily(updated);
    db.saveFamily(updated);
  };

  const shareStatus = () => {
    const me = localStorage.getItem('otp_me') || 'Alguien';
    if (!myStatus.trim()) return;
    db.setGroupStatus(me, myStatus.trim());
    setGroupStatus(db.getGroupStatus());
    setMyStatus('');
  };

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <Link to="/mas" className="inline-flex items-center gap-1 text-sm text-brand-600"><ArrowLeft size={14} /> Más</Link>
      <header>
        <h1 className="text-xl font-extrabold text-slate-800">Familia</h1>
        <p className="text-sm text-slate-500">{family.length} en la lista</p>
      </header>

      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
        <div className="flex gap-2 mb-3">
          <input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Nombre" className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none" />
          <button onClick={add} className="bg-brand-600 text-white p-2 rounded-lg"><Plus size={16} /></button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {family.map(f => (
            <span key={f} className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full">
              {f}
              <button onClick={() => remove(f)}><X size={11} /></button>
            </span>
          ))}
        </div>
      </div>

      <section>
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5"><MapPinned size={14} /> ¿Dónde está cada quién?</h2>
        <p className="text-xs text-slate-500 mb-2">
          El GPS en vivo entre 20 personas requiere un backend compartido (ver README — Fase 2 con Supabase).
          Por ahora, cada quien escribe dónde está y se actualiza al recargar la app.
        </p>
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm space-y-2">
          <div className="flex gap-2">
            <input value={myStatus} onChange={e => setMyStatus(e.target.value)} onKeyDown={e => e.key === 'Enter' && shareStatus()} placeholder="Ej: En Space Mountain, nos vemos en 30 min" className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-xs bg-slate-50 focus:outline-none" />
            <button onClick={shareStatus} className="bg-brand-600 text-white px-3 py-2 rounded-lg text-xs font-medium">Compartir</button>
          </div>
          <div className="space-y-1.5 pt-1">
            {groupStatus.length === 0 && <p className="text-xs text-slate-400 text-center py-2">Nadie ha compartido su estado todavía</p>}
            {groupStatus.map(g => (
              <div key={g.name} className="flex items-center justify-between text-xs bg-slate-50 rounded-lg px-3 py-2">
                <span className="font-medium text-slate-700">{g.name}</span>
                <span className="text-slate-500">{g.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
