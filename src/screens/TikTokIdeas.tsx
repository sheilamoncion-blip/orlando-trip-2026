import { useMemo, useState } from 'react';
import BackButton from '../components/BackButton';
import { Music2, Flame, Search, X } from 'lucide-react';
import { TIKTOK_IDEAS } from '../data/trip';
import { PARK_LABELS } from '../types';
import { db } from '../lib/db';

export default function TikTokIdeas() {
  const [, forceRerender] = useState(0);
  const [query, setQuery] = useState('');
  const [uploaderFilter, setUploaderFilter] = useState('all');
  const family = db.getFamily();

  const assignees = useMemo(() => Array.from(new Set(TIKTOK_IDEAS.map(i => db.getAssignee(i.id)).filter(Boolean))), []);

  const setStep = (id: string, step: 'filmed' | 'edited' | 'posted') => {
    const status = db.getTikTokStatus(id);
    db.setTikTokStatus(id, { ...status, [step]: !status[step] });
    forceRerender(n => n + 1);
  };

  const setUploader = (id: string, name: string) => {
    db.setAssignee(id, name);
    forceRerender(n => n + 1);
  };

  const filtered = TIKTOK_IDEAS.filter(idea => {
    const uploader = db.getAssignee(idea.id);
    if (uploaderFilter !== 'all' && uploader !== uploaderFilter) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return idea.title.toLowerCase().includes(q) || idea.description.toLowerCase().includes(q) || idea.audio.toLowerCase().includes(q);
  });

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-3">
      <BackButton fallback="/mas" label="Más" />
      <header>
        <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2"><Music2 size={20} /> Ideas para TikTok</h1>
        <p className="text-sm text-slate-500">Videos sugeridos por parque</p>
      </header>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar idea..." className="w-full border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300" />
        {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><X size={14} /></button>}
      </div>

      {assignees.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4">
          <button onClick={() => setUploaderFilter('all')} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition ${uploaderFilter === 'all' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 text-slate-600'}`}>Todos</button>
          {assignees.map(a => (
            <button key={a} onClick={() => setUploaderFilter(a)} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition ${uploaderFilter === a ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 text-slate-600'}`}>{a}</button>
          ))}
        </div>
      )}

      {filtered.length === 0 && <p className="text-center text-sm text-slate-400 py-10">Nada coincide con tu búsqueda</p>}

      {filtered.map(idea => {
        const status = db.getTikTokStatus(idea.id);
        const uploader = db.getAssignee(idea.id);
        return (
          <div key={idea.id} className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-800">{idea.title}</h3>
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-rose-500 shrink-0">
                <Flame size={11} /> {idea.viralPotential}/5
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">🎵 {idea.audio} · {idea.durationSec}s</p>
            <p className="text-xs text-slate-600 mt-1">{idea.description}</p>
            <p className="text-xs text-slate-400 mt-1">Mejor momento: {idea.bestTime} {idea.park !== 'any' && `· ${PARK_LABELS[idea.park]}`}</p>
            <div className="flex gap-1.5 mt-2.5">
              {(['filmed', 'edited', 'posted'] as const).map(step => (
                <button
                  key={step}
                  onClick={() => setStep(idea.id, step)}
                  className={`flex-1 text-[11px] font-medium py-1.5 rounded-lg border transition ${
                    status[step] ? 'bg-brand-600 text-white border-brand-600' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {step === 'filmed' ? 'Filmado' : step === 'edited' ? 'Editado' : 'Publicado'}
                </button>
              ))}
            </div>
            <select value={uploader} onChange={e => setUploader(idea.id, e.target.value)} className="w-full mt-2 border border-slate-200 rounded-lg px-2 py-1.5 text-xs bg-slate-50 focus:outline-none">
              <option value="">¿Quién la sube?</option>
              {family.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        );
      })}
    </div>
  );
}
