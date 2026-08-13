import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { CHARACTERS } from '../data/trip';
import { PARK_LABELS, PARK_COLORS } from '../types';
import CommentThread from '../components/CommentThread';

export default function Characters() {
  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-3">
      <Link to="/mas" className="inline-flex items-center gap-1 text-sm text-brand-600"><ArrowLeft size={14} /> Más</Link>
      <header>
        <h1 className="text-xl font-extrabold text-slate-800">Personajes & Fotos</h1>
        <p className="text-sm text-slate-500">Dónde encontrarlos y qué esperar</p>
      </header>

      {CHARACTERS.map(c => (
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
