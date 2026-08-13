import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Music2, Flame } from 'lucide-react';
import { TIKTOK_IDEAS } from '../data/trip';
import { PARK_LABELS } from '../types';
import { db } from '../lib/db';

export default function TikTokIdeas() {
  const [, forceRerender] = useState(0);

  const setStep = (id: string, step: 'filmed' | 'edited' | 'posted') => {
    const status = db.getTikTokStatus(id);
    db.setTikTokStatus(id, { ...status, [step]: !status[step] });
    forceRerender(n => n + 1);
  };

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-3">
      <Link to="/mas" className="inline-flex items-center gap-1 text-sm text-sky-600"><ArrowLeft size={14} /> Más</Link>
      <header>
        <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2"><Music2 size={20} /> Ideas para TikTok</h1>
        <p className="text-sm text-slate-500">Videos sugeridos por parque</p>
      </header>

      {TIKTOK_IDEAS.map(idea => {
        const status = db.getTikTokStatus(idea.id);
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
                    status[step] ? 'bg-sky-600 text-white border-sky-600' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {step === 'filmed' ? 'Filmado' : step === 'edited' ? 'Editado' : 'Publicado'}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
