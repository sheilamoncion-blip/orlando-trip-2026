import { useMemo, useState } from 'react';
import BackButton from '../components/BackButton';
import { ExternalLink, Search, X } from 'lucide-react';
import { CHARACTERS } from '../data/trip';
import { PARK_LABELS, PARK_COLORS, type ParkId } from '../types';
import CommentThread from '../components/CommentThread';

export default function Characters() {
  const [query, setQuery] = useState('');
  const [park, setPark] = useState<ParkId | 'all'>('all');

  const parksPresent = useMemo(() => Array.from(new Set(CHARACTERS.map(c => c.park))), []);

  const filtered = CHARACTERS.filter(c => {
    if (park !== 'all' && c.park !== park) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.freebies.some(f => f.toLowerCase().includes(q)) || c.area?.toLowerCase().includes(q);
  });

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-3">
      <BackButton fallback="/mas" label="Más" />
      <header>
        <h1 className="text-xl font-extrabold text-slate-800">Personajes & Fotos</h1>
        <p className="text-sm text-slate-500">Dónde encontrarlos y qué esperar</p>
      </header>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar personaje..."
          className="w-full border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={14} /></button>
        )}
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4">
        <button onClick={() => setPark('all')} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition ${park === 'all' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 text-slate-600'}`}>Todos</button>
        {parksPresent.map(p => (
          <button key={p} onClick={() => setPark(p)} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition ${park === p ? 'text-white border-transparent' : 'bg-white border-slate-200 text-slate-600'}`} style={park === p ? { backgroundColor: PARK_COLORS[p] } : undefined}>
            {PARK_LABELS[p]}
          </button>
        ))}
      </div>

      {filtered.length === 0 && <p className="text-center text-sm text-slate-400 py-10">Nada coincide con tu búsqueda</p>}

      {filtered.map(c => (
        <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-800">{c.name}</h3>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full text-white shrink-0" style={{ backgroundColor: PARK_COLORS[c.park] }}>{PARK_LABELS[c.park]}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Apariciones: {c.appearanceTimes.join(' · ')}</p>
          <p className="text-xs text-slate-500">Mejor hora (menos fila): <span className="font-medium text-slate-700">{c.bestTime}</span></p>
          <p className="text-xs text-slate-600 mt-1"><span className="font-medium">Regalos/freebies:</span> {c.freebies.join(', ')}</p>
          <p className="text-xs text-slate-500 mt-1 italic">📸 {c.photoTip}</p>
          {c.referenceLinks.length > 0 && (
            <a href={c.referenceLinks[0]} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] text-brand-600 mt-1.5 hover:underline">
              <ExternalLink size={11} /> Fotos de referencia
            </a>
          )}
          <CommentThread threadId={c.id} />
        </div>
      ))}
    </div>
  );
}
